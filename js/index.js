// your code here

let username = "";
function getRepositories() {
  username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();

}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r =>
    '<li>' +
    r.name +
    ' - <a href="#" data-repo="' +
    r.name +
    '" onclick="getCommits(this)">Get Commits</a>' +
    ',  ' +
    ' <a href="#" data-repo="' +
    r.name +
    '" onclick="getBranches(this)">Get Branches</a>' +
    '</li>').join('')}</ul>`;

  document.getElementById("repositories").innerHTML = repoList;

  // const repoList_1 =`<ul>${repos.map(r =>
  //     '<li>' +
  //     r.name +
  //     ' - <a href="#" data-repo="' +
  //     r.name +
  //     '" onclick="getBranches(this)">Get Branches</a>' +
  //     '</li>').join('')}</ul>`;
  // document.getElementById("repositories").innerHTML += repoList_1;
}
//GET /repos/:owner/:repo/commits
function getCommits(el) {
  debugger;
  console.log(el.dataset.repo);
  const name = el.dataset.repo;
  console.log(`getCommits - ${name}`);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function getBranches(el) {
  console.log('getBranches');
  const name = el.dataset.repo;
  console.log(`getBranches - ${name}`);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(
    commit =>
    '<li><strong>' +
    commit.author.login +
    '</strong> - ' +
    commit.commit.author.name + ":  " +
    commit.commit.message +
    '</li>'
  ).join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches.map(
    b =>
    '<li>' + b.name + '</li>'
  ).join('')}</ul>`;

  document.getElementById("details").innerHTML = branchesList;
}
