// document.addEventListener('DOMContentLoaded', function() {
//     console.log('asas');
//     axios.get('http://localhost:5000/admin')  // Asume que tu endpoint es '/api/articles'
//         .then(function(response) {
//             const articles = response.data; // Asume que los datos vienen en formato JSON
//             const listGroup = document.querySelector('.list-group');
//             articles.forEach(article => {
//                 const articleElement = `
//                     <a href="/article?id${article.id}" class="list-group-item list-group-item-action">
//                         <div class="d-flex w-100 justify-content-between">
//                             <h5 class="mb-1">${article.title}</h5>
//                             <small>${article.date}</small>
//                         </div>
//                         <p class="mb-1">${article.summary}</p>
//                     </a>
//                 `;
//                 listGroup.innerHTML += articleElement;
//             });
//         })
//         .catch(function(error) {
//             console.error('Error fetching articles:', error);
//         });
// });
