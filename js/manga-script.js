const base_URL = 'https://api.jikan.moe/v4/';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('#search');

async function getMangas(term) {
    main.innerHTML = '';
    let resp = null;
    if(null !== term) {
        resp = await fetch(base_URL + 'manga?q=' + term + '&sfw');

    } else {
        resp = await fetch(base_URL + 'top/manga'); 
    }

    const respData = await resp.json();


    console.log(respData);

    respData.data.forEach((manga) => {
       
        const { title, title_japanese, score, images, volumes, status, chapters, synopsis, authors} = manga;

        const authorsString = authors.reduce((acc, {mal_id, type, name, url })=>{
            acc.push(name)
            return acc
        }, []).join(', ')



        var mangaEl = document.createElement('div');

        mangaEl.classList.add('anime');

        mangaEl.innerHTML = `

        <div class="card animeBox" style="width: 18rem;">
    
            <img src="${images.webp.image_url}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text"><span class="${getClassByScore(score)}">${score}</span></p>
            </div>

            <div class="details">
                <h4>${title}</h4>
                <h6>${title_japanese}</h6>
                <br />
                <h5>Overview:</h5>
                <p>${synopsis}</p>
                <br />
                <p> Volumes: ${volumes}</p>
                <p> Chapters: ${chapters}</p>
                <p> Authors: ${authorsString}</p>
                <p> Status: ${status}</p>
                
                
            </div>

        </div>
       
     
        `;

        main.appendChild(mangaEl);
    })


    return respData;
}

getMangas(null);


function getClassByScore(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote < 8 && vote >= 7) {
        return 'semigreen'
    } else if (vote < 7 && vote >= 6) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log(search)
    getMangas(search.value);
   
});