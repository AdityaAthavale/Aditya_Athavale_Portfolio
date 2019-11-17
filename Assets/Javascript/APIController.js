let repos = []
class Repository {
    id = ""
    url = ""
    name = ""
    description = ""
    homepage = ""

    constructor(id, name, description, url) {
        this.id = id
        this.url = url
        this.name = name
        this.description = description
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
                let repo = new Repository(element.id, element.name, element.description, element.html_url)
                repos.push(repo)
            }
        });
        createCards()
    });
}

function createRepositoryCard(repo) {
    let cardDiv = $('<div>')
    cardDiv.addClass('card')
    cardDiv.addClass('col-md-3')
    cardDiv.addClass('buffer')

    let cardTitle = $('<h5>')
    cardTitle.addClass('card-title')
    cardTitle.addClass('buffer')
    cardTitle.text(repo.name)

    let cardText = $('<p>')
    cardText.addClass('card-text')
    cardText.text("")

    let github = $('<a>')
    github.addClass('btn')
    github.addClass('btn-primary')
    github.addClass('btn-outline-info')
    github.addClass('buffer')
    github.attr('href', repo.url)
    github.attr('target', '_blank')
    github.text('Git Hub')

    cardDiv.append(cardTitle)
    cardDiv.append(cardText)
    cardDiv.append(cardText)
    cardDiv.append(github)
    var request;
    if(window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");
    request.open('GET', "https://adityaathavale.github.io/" + repo.name + "/", false);
    request.send();
    if (request.status !== 404) {
        let homePageButton = $('<a>')
        homePageButton.addClass('btn')
        homePageButton.addClass('btn-primary')
        homePageButton.addClass('btn-outline-info')
        homePageButton.addClass('buffer')
        homePageButton.attr('href', "https://adityaathavale.github.io/" + repo.name + "/")
        homePageButton.attr('target', '_blank')
        homePageButton.text('Home page')
        cardDiv.append(homePageButton)
    }
    
    return cardDiv
}

function createCards() {
    for(i=0; i<repos.length; i++) {
        let row = $('<div>')
        row.addClass('row')
        row.addClass('buffer')
        row.append(createEmptyColumn())
        row.append(createRepositoryCard(repos[i]))
        i++;
        if(repos.length > i) {
            //row.append(createEmptyColumn())
            row.append(createRepositoryCard(repos[i]))
            i++
        }
        if(repos.length > i) {
            //row.append(createEmptyColumn())
            row.append(createRepositoryCard(repos[i]))
        }
        $('#repoList').append(row)
    }
}

function createEmptyColumn() {
    let col = $('<div>')
    col.addClass('col-md-1')
    return col
}

$(document).ready(function () {
    getGithubRepositories()
});