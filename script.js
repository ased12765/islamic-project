// explore btn
let btn=document.querySelector(".btn")
let hadSection=document.querySelector(".hadith")
btn.addEventListener('click',()=>{
    hadSection.scrollIntoView({
        behavior:"smooth"
    })
})
let scrollbtn=document.querySelector('.scrollbtn')
let fixhead=document.querySelector('.header')
window.addEventListener("scroll",()=>{
    window.scrollY>100 ? fixhead.classList.add('active'): fixhead.classList.remove('active')
    window.scrollY>500 ? scrollbtn.classList.add('active'): scrollbtn.classList.remove('active')
}
)
scrollbtn.addEventListener('click',()=>{
  window.scrollTo({
      top:0,
      behavior:"smooth"
  })
})
// bars
let bars=document.querySelector('.bars')
bars.addEventListener('click',()=>{

   document.querySelector('.header ul').classList.toggle('active')
})
// Hadith section
let hadcontainer=document.querySelector('.hadithContainer')
let prev=document.querySelector('.prev')
let number=document.querySelector('.number')
let next=document.querySelector('.next')
let hadithIndex=0
hadChange()
function hadChange(){
    fetch('http://api.hadith.sutanlab.id/books/muslim?range=1-300')
    .then(res=>res.json())
    .then(data=>{
        let Hadiths=data.data.hadiths
        console.log(Hadiths[hadithIndex].arab)
        changeHadith()
        next.addEventListener('click',()=>{
            hadithIndex==299?hadithIndex=0:hadithIndex++
            changeHadith()
        })
        prev.addEventListener('click',()=>{
            hadithIndex==0?hadithIndex=299:hadithIndex--
            changeHadith()
        })
        function changeHadith(){
            hadcontainer.innerText=Hadiths[hadithIndex].arab
            number.innerText=`300 - ${hadithIndex+1}`
        }
    })
}

// link sections
let sections=document.querySelectorAll('section'),
links=document.querySelectorAll('header ul li')
links.forEach(link=>{
link.addEventListener('click',()=>{
   document.querySelector('.header ul li.active').classList.remove('active')
   link.classList.add('active')
   let target =link.dataset.filter
   sections.forEach(section=>{
      if( section.classList.contains(target)){
          section.scrollIntoView({
              behavior:"smooth"
          }
          )
      }
   })

})
})
// surhas function
let surhaContainer=document.querySelector('.surhasContainer')
getSurha()
function getSurha(){
    fetch("http://api.alquran.cloud/v1/meta")
    .then(res=>res.json())
    .then(data=>{
        let surhas=data.data.surahs.references
        const numOfSurhas=114
        for(let i=0;i<numOfSurhas;i++){
            surhaContainer.innerHTML+=`
            <div class="surha">
                <p>${surhas[i].name}</p>
                <p>${surhas[i].englishName}</p>
            </div>
            `
        }
        let surhaTitles=document.querySelectorAll('.surha')
        let popup=document.querySelector('.surha-popup')
        let ayatContainer=document.querySelector('.ayat')
        surhaTitles.forEach((title,index)=>{
         title.addEventListener('click',()=>{
             fetch(`http://api.alquran.cloud/v1/surah/${index +1}`)
             .then(res=>res.json())
             .then(data=>{
                ayatContainer.innerHTML=''
                let Ayat=data.data.ayahs
               Ayat.forEach(aya=>{
                popup.classList.add('active')
                ayatContainer.innerHTML+=`<p>${aya.numberInSurah} - ${aya.text}`
               })
                   
                
             })
         })
        })
        let closePopUp=document.querySelector('.close-popup')
        closePopUp.addEventListener('click',()=>{
            popup.classList.remove('active')
        })
    })
}
// praytime function
let cards=document.querySelector('.cards')
pray()
function pray(){
fetch('http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')
.then(res=>res.json())
.then(data=>{
    let times=data.data.timings
    cards.innerHTML=''
    for(let time in times){
        cards.innerHTML+=
        `<div class="card">
        <div class="circle">
            <svg>
             <circle cx="100" cy="100" r="100"></circle>
            </svg> 
            <div class="praytime">${times[time]}</div>
        </div>
        <p >${time}</p>
    </div>
        `
}
})
}