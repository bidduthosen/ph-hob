const btnContainer = document.getElementById('btn-container');
const categoriesContainer = document.getElementById('categories-container');


const loadFetch = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const {data} = await res.json();
    displayLoadCategory(data)
}


const displayLoadCategory = (category) =>{
    category.forEach(categoryBtn => {
        const {category, category_id} = categoryBtn
        const newBtn = document.createElement('button');
        newBtn.classList.add('btn');
        newBtn.innerText = `${category}`;

        newBtn.addEventListener('click', () => categoryDataLoad(category_id));
        btnContainer.appendChild(newBtn);
    })
}


// by default category id selected
let selectCategoryId = 1001;

const categoryDataLoad = async(categoryId) =>{

    selectCategoryId = categoryId;

    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(url);
    const {data} = await res.json();
    categoryDataLoadDisplay(data);
}


const categoryDataLoadDisplay = (categoriesData) =>{
    categoriesContainer.textContent = "";

    categoriesData.forEach(card =>{
        const {title, thumbnail, others} = card;
        console.log(card)
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
                        <div class="pl-4 text-sm font-bold">${card?.authors[0]?.profile_name}</div>
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
categoryDataLoad(selectCategoryId);