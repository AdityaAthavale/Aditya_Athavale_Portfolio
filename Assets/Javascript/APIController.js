let repos = []
class Repository {
    id = ""
    url = ""
    name = ""
    description = ""
    homepage = ""

    constructor(id, url, name, description, homepage) {
        this.id = id
        this.url = url
        this.name = name
        this.description = description
        this.homepage = homepage
    }
}

function getGithubRepositories() {
    const myReposURL = "https://api.github.com/users/AdityaAthavale/repos"
    $.ajax({
        url: myReposURL,
        method: "GET"
    }).then(function (response) {
        response.forEach(element => {
            if(element.name != "AdityaAthavale.github.io") {
                let repo = new Repository(element.id, element.name, element.description, element.homepage)
                repos.push(repo)
                createAndAppendRepositoryCard(repo)
            }
        });
    });
}

function createAndAppendRepositoryCard(repo) {
    let cardDiv = $('<div>')
    cardDiv.addClass('card')

    let cardTitle = $('<h5>')
    cardTitle.addClass('card-title')
    cardTitle.text(repo.name)

    let cardText = $('<p>')
    cardText.addClass('card-text')
    cardText.text(repo.description)

    let homePageButton = $('<a>')
    homePageButton.addClass('btn')
    homePageButton.addClass('btn-primary')
    homePageButton.attr('href', repo.homepage)
    homePageButton.attr('target', '_blank')
    homePageButton.text('See Home Page')

    let cloneButton = $('<a>')
    cloneButton.addClass('btn')
    cloneButton.addClass('btn-primary')
    homePageButton.attr('href', repo.url)
    homePageButton.attr('target', '_blank')
    homePageButton.text('Open Repo')

    cardDiv.append(cardTitle)
    cardDiv.append(cardText)
    cardDiv.append(homePageButton)
    cardDiv.append(cloneButton)

    $('#repoList').append(cardDiv)
}

$(document).ready(function () {
    getGithubRepositories()
});