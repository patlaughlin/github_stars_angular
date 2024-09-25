/**
 * Challenge:
 * Complete the React component below to fetch repositories from GitHub's API for a given username
 * and display them in a list sorted by the number of stars in descending order. Finally, refactor the username to be dynamic and fetched from a form input. You may do this as a first step if you prefer.
 *
 * Requirements:
 * - Fetch repositories from GitHub's API for a given username.
 * - Display the repository name and star count.
 * - Sort the repositories by star count in descending order.
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
