# Ngrx-app

  The purpose of this Angular application is to show the use of ngrx library for better state management. 
  The application retrieves data from a specific GitHub repository and allows their visualization and manipulation.

## Features

* Get last 30 commits from default branch for a specified repository
* List all the developers that contributed and filter commits by setting developer as active or inactive
* Display developers contribution (%) by using Pie Chart (Donut)
* Display all the fetched commits by using unidirected Graph
* Manipulate with selected commit by changing its author and parent nodes
* Deleting selected commit

## Prerequisites

  Node.js: https://nodejs.org/en/
  
## Install & Run

  Use the node package manager [npm](https://www.npmjs.com/) to install and run Ngrx-app.

  ```bash
  npm install

  ng serve
  ```
  
## Structure
  
  Application contains five components which are using and communicating across the same store. 
  Store is <strong>normalized</strong> and <strong>modularized</strong>. 
  
  <kbd>![alt text](/src/assets/components.png)


## Demo
  
  1. Getting data from GitHub, displaying and filtering by developers
  <kbd>![alt text](/src/assets/ngrx-app_dev_filter.gif)
  
  
  2. Manipulating with commits (selecting, changing author and parent commits, deleting)
  <kbd>![alt text](/src/assets/ngrx-app_commits_man.gif)
  
  *note: while changing author, developer is selected from the dropdown, but it is not visible on the gif





