import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SolutionAppComponent } from './solution.component';

describe('SolutionAppComponent', () => {
  let component: SolutionAppComponent;
  let fixture: ComponentFixture<SolutionAppComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionAppComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionAppComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.username).toBe('');
    expect(component.submittedUsername).toBe('');
    expect(component.repos).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
    expect(component.expandedRepoId).toBeNull();
  });

  it('should fetch repositories on form submit', fakeAsync(() => {
    component.username = 'octocat';
    const formEvent = new Event('submit');
    component.handleFormSubmit(formEvent);

    expect(component.submittedUsername).toBe('octocat');
    expect(component.loading).toBeTrue();
    expect(component.error).toBe('');
    expect(component.repos).toEqual([]);

    // Expect a GET request to the GitHub API
    const req = httpTestingController.expectOne(
      'https://api.github.com/users/octocat/repos'
    );
    expect(req.request.method).toEqual('GET');

    // Mock response data
    const mockRepos = [
      { id: 1, name: 'Repo1', stargazers_count: 5, html_url: 'http://example.com/repo1' },
      { id: 2, name: 'Repo2', stargazers_count: 10, html_url: 'http://example.com/repo2' },
      { id: 3, name: 'Repo3', stargazers_count: 3, html_url: 'http://example.com/repo3' },
    ];

    // Respond with mock data
    req.flush(mockRepos);

    // Advance the virtual time
    tick();

    // The loading should be false after response
    expect(component.loading).toBeFalse();

    // The repos should be sorted by stargazers_count in descending order
    expect(component.repos).toEqual([
      { id: 2, name: 'Repo2', stargazers_count: 10, html_url: 'http://example.com/repo2' },
      { id: 1, name: 'Repo1', stargazers_count: 5, html_url: 'http://example.com/repo1' },
      { id: 3, name: 'Repo3', stargazers_count: 3, html_url: 'http://example.com/repo3' },
    ]);

    // No errors
    expect(component.error).toBe('');
  }));

  it('should handle HTTP error on form submit', fakeAsync(() => {
    component.username = 'nonexistentuser';
    const formEvent = new Event('submit');
    component.handleFormSubmit(formEvent);

    expect(component.submittedUsername).toBe('nonexistentuser');
    expect(component.loading).toBeTrue();
    expect(component.error).toBe('');
    expect(component.repos).toEqual([]);

    // Expect a GET request to the GitHub API
    const req = httpTestingController.expectOne(
      'https://api.github.com/users/nonexistentuser/repos'
    );
    expect(req.request.method).toEqual('GET');

    // Respond with an error
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    // Advance the virtual time
    tick();

    // The loading should be false after response
    expect(component.loading).toBeFalse();

    // The repos should still be empty
    expect(component.repos).toEqual([]);

    // Error should be set
    expect(component.error).toBe('HTTP error! Status: 404');
  }));

  it('should not make an HTTP request if the username is empty after trimming', () => {
    component.username = '   '; // String with only spaces
    const formEvent = new Event('submit');
    component.handleFormSubmit(formEvent);

    expect(component.submittedUsername).toBe('');
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
    expect(component.repos).toEqual([]);

    // Verify that no HTTP requests were made
    httpTestingController.expectNone(
      'https://api.github.com/users//repos'
    );
  });


  it('should display "No repositories found" when repos array is empty', fakeAsync(() => {
    component.username = 'userwithnorepos';
    const formEvent = new Event('submit');
    component.handleFormSubmit(formEvent);

    expect(component.submittedUsername).toBe('userwithnorepos');
    expect(component.loading).toBeTrue();
    expect(component.error).toBe('');
    expect(component.repos).toEqual([]);

    // Expect a GET request to the GitHub API
    const req = httpTestingController.expectOne(
      'https://api.github.com/users/userwithnorepos/repos'
    );
    expect(req.request.method).toEqual('GET');

    // Respond with an empty array
    req.flush([]);

    // Advance the virtual time
    tick();

    // The loading should be false after response
    expect(component.loading).toBeFalse();

    // The repos should be empty
    expect(component.repos).toEqual([]);

    // Error should still be empty
    expect(component.error).toBe('');
  }));
});
