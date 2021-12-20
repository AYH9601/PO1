const body = document.querySelector("body"); 
const frame = document.querySelector("#list"); 
const loading = document.querySelector(".loading"); 
const input = document.querySelector("#search"); 
const btn = document.querySelector(".btnSearch"); 
const errMsg = document.querySelector(".errMsg"); 
const base = "https://www.flickr.com/services/rest/?"; 
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "2fb9756d5c2a17287d72e1361294b949"; 
const per_page = 10; 
const format = "json"; 

//flickr.interestingness.getList 메소드
const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

callData(url1);

//이미지 검색 버튼 클릭 시 
btn.addEventListener("click", e=>{
    let tag = input.value;

    //flickr.photos.search method
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if(tag != ""){
        callData(url);
        errMsg.style.display = "none";
    }else {
        console.log("검색어를 입력하세요.");
        errMsg.innerText = "검색어를 입력하세요";
        errMsg.style.display = "block";

        frame.innerHTML = ""; 
        frame.classList.remove("on"); 
        frame.style.height = 0; 
    }
});

//검색어 입력 후 enter 눌렀을 때
input.addEventListener("keyup",e=>{
    if(e.key === "Enter"){
        let tag = input.value;
        //flickr.photos.search mthod
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        if(tag != ""){
            callData(url);
            errMsg.style.display = "none";
        }else{
            console.log("검색어를 입력하세요.");
            errMsg.innerText = "검색어를 입력하세요";
            errMsg.style.display = "block";
    
            frame.innerHTML = "";
            frame.classList.remove("on"); 
            frame.style.height = 0; 
        }
    }
});


//동적으로 레이어팝업 생성 이벤트
frame.addEventListener("click", e=>{
    e.preventDefault();

    if(e.target == frame) return;

    let target = e.target.closest(".item").querySelector(".thumb");

    if(e.target == target){

        //순간적으로 body의 속성을 overflow:hodden 적용해서 스크롤 기능 방지
        body.style.overflow = "hidden";

        let imgSrc = target.parentElement.getAttribute("href");

        let pop = document.createElement("aside");
        pop.classList.add("pop");
        let pops = `
                    <div class = "con">
                        <img src ="${imgSrc}">
                    </div>
                    <span class="close">close</span>
                    `;
        pop.innerHTML = pops;
        body.append(pop);
    }else{
        return;
    }
});


//팝업 닫기 버튼 클릭 시 
body.addEventListener("click", e=>{
    
    let pop = body.querySelector(".pop");

    if(pop != null){
        let close = pop.querySelector(".close");
        if(e.target == close){
        
            body.style.overflow = "auto";
            pop.remove();
        }
    }
});

function callData(url){
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
    .then(data=>{
        return data.json();
    })

    .then(json=>{
            let items = json.photos.photo;
            
            if(items.length >0){
                createList(items);
                delayLoading();
            }else {
                console.log("검색하신 이미지의 데이터가 없습니다.");

                loading.classList.add("off");
                errMsg.innerText = "검색하신 이미지의 테이터가 없습니다."
                errMsg.style.display = "block";

                //이전 list li의 높이값이 남아 있는 것을 제거 
                frame.classList.remove("on"); 
                frame.style.height = 0; 
            }
    });
}

function createList(items){
    let htmls = "";

    items.forEach(data=>{
        console.log(data)
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg` 
        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`

        htmls += `
                <li class="item">
                    <div>
                        <a href="${imgSrcBig}">
                            <img class="thumb" src="${imgSrc}">
                        </a>
                        <p>${data.title}</p>
                        <span>
                            <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                            <strong>${data.owner}</strong>
                        </span>
                    </div>
                </li> 
        `;
    });

    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0; 

    for (let el of imgs){
        el.onload = () =>{
            count++;

            if(count === len) isoLayout();
        }

        let thumb = el.closest(".item").querySelector(".thumb");
        thumb.onerror = e => {
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "img/k1.jpg");
        }

        let profile = el.closest(".item").querySelector(".profile");
        profile.onerror = e =>{
            e.currentTarget.closest(".item").querySelector(".profile").setAttribute("src","img/buddyicon08.png");
        }
    }
}

function isoLayout(){

    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list", {
        itemSelector : ".item",
        columnWidth : ".item",
        transitionDuration : "0.5s"
    })
}