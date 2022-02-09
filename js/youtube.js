const vidList = document.querySelector(".vidList");
const key = "AIzaSyDE6DkHv8EVqiL6I61K8ex5nZ7genFVd_o";
const playListId = "PLrVltBJtL0uwlt0PxEwQVlAD_d-PIFqRK";
const num = 9;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

fetch(url)

.then(data=>{
    return data.json();
})

.then(json=>{
    let items = json.items;
    let result = "";

    items.forEach(item =>{
        let title = item.snippet.title;
        if(title.length >20){
            title = title.substr(0,50)+"...";
        }

        let date = item.snippet.publishedAt;
        date = date.split("T")[0];

        result +=`
                    <article>
                        <a href="${item.snippet.resourceId.videoId}" class="pic">
                            <img src="${item.snippet.thumbnails.medium.url}">
                        </a>
                        <div class="con">
                            <h2>${title}</h2>
                        </div>
                    </article>
                `;
    });
    vidList.innerHTML = result;
});

vidList.addEventListener("click", e=>{
    e.preventDefault();

    if(e.target.closest("a") == null) return;

    const vidId = e.target.closest("a").getAttribute("href");
    let pop = document.createElement("figure");
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose">CLOSE</span>
    `;

    vidList.append(pop);
});

vidList.addEventListener("click", e=>{
    const pop = vidList.querySelector("figure");

    if(pop !=null){
        const close = pop.querySelector("span");
        
        if(e.target == close){
            e.target.closest("figure").remove();
        }
    }
});