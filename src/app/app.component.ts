/**
 * Challenge:
 * Complete the Angular component below to fetch repositories from GitHub's API for a given username.
 *
 * Requirements:
 * - Fetch repositories from GitHub's API for a given username.
 * - Display the repository name and star count.
 * - Sort the repositories by star count in descending order.
 * - Cicking a repo's row should expand with the url to the repo.
 *   - Clicking the repo url should open in a new tab
 *   - Clicking the repo url should close any other open row
 * - Handle loading and error states appropriately.
 *
 * Instructions:
 * - Fill in the missing parts of the code where indicated.
 * - You may add any additional helper functions or state variables as needed.
 * - Do not change the component's name or its export.
 *
 * How to Run:
 * 1. Run the project using `npm start` or `yarn start`.
 * 2. The component should display a list of repositories for a given GitHub username sorted by stars.
 */

// Example Output:
// GitHub Repository Viewer
//
//     [Enter GitHub username] [Fetch Repositories]
//
// Repositories of facebook
//
// - react (Stars: 200000)
// - react-native (Stars: 100000)
// - jest (Stars: 35000)

import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repo-list',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class RepoListComponent implements OnInit {
  repos: any[] = [];
  loading = false;
  error: any = null;
  username = 'facebook';
  githubUrl = 'https://api.github.com/users/USERNAME/repos';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fetchRepositories() {
    this.loading = true;
  }
}
