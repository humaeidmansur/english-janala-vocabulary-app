const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res)=> res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=> btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive(); //remove all active class
            const clickBtn= document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn)
            clickBtn.classList.add("active"); //add active class
            displayLevelWord(data.data);
});
};

const displayLevelWord=(words)=>{
const wordContainer=document.getElementById("word-container");
wordContainer.innerHTML="";

if(words.length == 0){
    wordContainer.innerHTML=`
    <div class="text-center col-span-full rounded-xl py-10 font-bangla space-y-6">
    <img src="./assets/alert-error.png" class="mx-auto"/>
    <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p> 
    <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    return;
}

//  {
//     "id": 82,
//     "level": 1,
//     "word": "Car",
//     "meaning": "গাড়ি",
//     "pronunciation": "কার"
// }

words.forEach(word => {
    console.log(word);
    const card=document.createElement("div");
    card.innerHTML=`  
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
    <h2 class="font-bold text-2xl">${word.word ? word.word :"There is no Word"}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "There is no meaning"} / ${word.pronunciation? word.pronunciation : "No pronounciation" }"</div>
      <div class="flex justify-between items-center">
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1A91FF10]  hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
      </div>
    </div>
    `;
    wordContainer.append(card);
})

};

const displayLesson = (lessons) => {
//  1. get the container & empty

const levelContainer = document.getElementById("level-container");
levelContainer.innerHTML = ``;  
//  2. get into every lesson
for (let lesson of lessons) {

//  3.create Element
console.log(lesson);

const btnDiv = document.createElement("div");
btnDiv.innerHTML = `  
<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
<i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
</button> `;
//  4.append into container
levelContainer.append(btnDiv);
}

};
loadlessons();