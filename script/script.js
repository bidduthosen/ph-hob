const btnContainer = document.getElementById('btn-container');
const categoriesContainer = document.getElementById('categories-container');
const noCategoriesContainer = document.getElementById('no-category-container');
const categoryButton = document.getElementsByClassName('category-button');
const sortBtn = document.getElementById('sort-btn');

// console.log(categoryButton)


const loadFetch = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const {data} = await res.json();
    displayLoadCategory(data)
}


const displayLoadCategory = (category) =>{
    category.forEach(categoryBtn => {
        const {category, category_id} = categoryBtn
        const newBtn = document.createElement('button');
        newBtn.classList.add('btn', 'category-button');
        newBtn.innerText = `${category}`;

        newBtn.addEventListener('click', () => {
            for(let categoryBtn of categoryButton){
                categoryBtn.classList.remove('bg-red-400');
            }
            newBtn.classList.add('bg-red-400');
            categoryDataLoad(category_id)
        });
        btnContainer.appendChild(newBtn);
    })
}


// by default category id selected
let selectCategoryId = 1001;

let sortByView = false;

sortBtn.addEventListener('click', ()=>{
    sortByView = true;
    categoryDataLoad(selectCategoryId, sortByView)
    
})


const categoryDataLoad = async(categoryId, sortByView) =>{

    selectCategoryId = categoryId;

    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(url);
    const {data} = await res.json();
    categoryDataLoadDisplay(data, sortByView);
}


const categoryDataLoadDisplay = (categoriesData, sortByView) =>{
    categoriesContainer.textContent = "";
    if(sortByView){
        categoriesData.sort((a, b)=> {
            const totalViewFirstStr = a.others?.views;
            const totalViewFSecondStr = b.others?.views;
            const totalViewFirstNumber= parseFloat(totalViewFirstStr.replace("k", '')) || 0;
            const totalViewFSecondNumber = parseFloat(totalViewFSecondStr.replace("k", '')) || 0;
            
            return totalViewFSecondNumber - totalViewFirstNumber;
        })
    }

    if(categoriesData.length === 0){
        noCategoriesContainer.classList.remove('hidden')
    }
    else{
        noCategoriesContainer.classList.add('hidden')
    }
    
    categoriesData.forEach(card =>{
        const {title, thumbnail, others} = card;


        let verifiedBadge = '';
        if(card.authors[0].verified){
            verifiedBadge = `<i class="fa-solid fa-certificate text-blue-800"></i>`;
        }
        const newCard = document.createElement('div');
        newCard.className = 'card  bg-base-100 shadow-xl';
        newCard.innerHTML = `
            <figure><img class="h-[300px] object-cover" src="${thumbnail}" /></figure>
                <div class="card-body">
                <h2 class="card-title">
                    <div class="avatar">
                        <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="${card?.authors[0]?.profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <div class="pl-4 text-xl font-bold">${title}</div>
                        <div class="pl-4 text-sm font-bold">${card?.authors[0]?.profile_name} ${verifiedBadge} ${card.authors[0].verified ? '<i class="fa-solid fa-certificate text-blue-800"></i>' : ''}</div>
                    </div>
                </h2>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline p-4"><span class =" pr-1">${others?.views}</span> View</div>
                </div>
            </div>

        `;
        categoriesContainer.appendChild(newCard)
    })
}



loadFetch();
categoryDataLoad(selectCategoryId, sortByView);