console.log("This is news app")

// news api use - bookmarked on chrome
// sign in to api - api key:-
// e21d688957924ce584e5b4416e2b49c9

//https://newsapi.org/v2/top-headlines?country=ca&apiKey=e21d688957924ce584e5b4416e2b49c9
// get news api
//json pretify extention - download from gpogle chrome

// grab news item
let newsAccordian = document.getElementById('newsAccordian');

// create a get request
const xhr = new XMLHttpRequest()

// initailize news api parameter
let apiKey = 'e21d688957924ce584e5b4416e2b49c9'

xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=ca&apiKey=${apiKey}`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText)
        let articles = json.articles
        let newsHtml = ""
        articles.forEach(function (element, index) {
            let news = `<div class="card">
                                <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed show" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                                aria-expanded="true" aria-controls="collapse${index}"><b class="text-success">Breaking News ${index + 1}:</b> ${element["title"]}</button>
                                </h2>
                                </div>
                                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                                data-bs-parent="#newsAccordian">
                                <div class="card-body">${element["content"]}. <a href="${element['url']}" target="_blank">Read more here</a></div>
                                </div>
                                  
                        </div>`
            newsHtml += news
        });
        newsAccordian.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()

let search = document.querySelector('#search')

let functSearch = function(){
    let inputVal = search.value
    console.log("input event fired!", inputVal)
    let newsCard = document.getElementsByClassName('card')
    Array.from(newsCard).forEach(function (element) {
        let cardText = element.getElementsByTagName("h2")[0].innerText;
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none"
        }
    })
}



search.addEventListener('input', functSearch)

