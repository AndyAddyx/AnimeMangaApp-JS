const base_URL = 'https://api.jikan.moe/v4/';
const search_API = 'https://api.jikan.moe/v4/anime?q=${animename}&sfw';

const form = document.querySelector('form');
const main = document.querySelector('main');
const search = document.querySelector('#search');
console.log(search)
console.log(form)

async function getAnimes(term) {
    main.innerHTML = '';
    let resp = null;
    if(null !== term) {
        resp = await fetch(base_URL + 'anime?q=' + term + '&sfw');

    } else {
        resp = await fetch(base_URL + 'top/anime');
    }
    
    const respData = await resp.json();


 


    console.log(respData);

    respData.data.forEach((anime) => {
        const { title,
             title_japanese, score,
              images, year,
               episodes, 
               status, 
               genres,
                studios,
                 synopsis} = anime;

    const genresString = genres.reduce((acc, {mal_id, name, type, url})=>{
        acc.push(name)
        return acc
    }, []).join(', ')

    const studiosString = studios.reduce((acc, {mal_id, type, name, url})=>{
        acc.push(name)
        return acc
    }, []).join(', ')


        var animeEl = document.createElement('div');

        animeEl.classList.add('anime');

        animeEl.innerHTML = `

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
                <p> Year: ${year}</p>
                <p> Episodes: ${episodes}</p>
                <p> Status: ${status}</p>
                <p> Genre: ${genresString}</p>
                <p> Studio: ${studiosString}</p>
                
            </div>

        </div>
       
     
        `;

  
        main.appendChild(animeEl);
    })


    return respData;
}



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

getAnimes(null);


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log(search)
    getAnimes(search.value);
   
});






