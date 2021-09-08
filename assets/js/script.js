//======================
// Variables 
//======================
const row = document.getElementById("row");
const warningText = document.getElementById("warning-text");
const spinner = document.getElementById("spinner");
const noFoundResultText = document.getElementById("no-found-text");

const clickBtn = () => {
	// Search Bar
	const searchInput = document.getElementById("search-input");
	const searchInputText = searchInput.value;
	searchInput.value = "";

	//=============================
	// Condition --------------------
	if (searchInputText === "") {
		// Show Warning Text
		warningText.style.display = "block";

		// Hide No Result Found Text
		noFoundResultText.style.display = "none";

		// Remover Previous Data
		row.textContent = "";

	} else {
		// Remover Previous Data
		row.textContent = "";

		// Hide Warning Text
		warningText.style.display = "none";

		// Hide No Result Found Text
		noFoundResultText.style.display = "none";

		// Show Spinner
		spinner.style.display = "block";

		// API Link
		fetch(`https://openlibrary.org/search.json?q=${searchInputText}`)
			.then(response1 => response1.json())
			.then(data => booksData(data))

		// Arrow Function
		const booksData = (mainData) => {
			// Get Array Of Docs
			const dataArry = mainData.docs;

			// Hide No Result Found Condition
			if (searchInputText === dataArry) {

			} else {
				// Hide No Result Found Text
				noFoundResultText.style.display = "block";
			};

			// Set Books Data In HTML
			dataArry.map(getData => {
				const col = document.createElement("div");
				col.classList.add("col", "column");
				col.innerHTML =
					`
						<div class="card">
							<img src="https://covers.openlibrary.org/b/id/${getData.cover_i}-M.jpg" class="card-img-top" alt="Books">
							<div class="card-body">
								<h5 class="card-title">Name: <span class="text-secondary">${getData.title ? getData.title : 'N/a'}</span></h5>
								<h5 class="card-title">Author: <span class="text-secondary">${getData.author_name ? getData.author_name[0] : 'N/a'}</span></65>
								<h5 class="card-title">Publisher: <span class="text-secondary">${getData.publisher ? getData.publisher[0] : 'N/a'}</span></h5>
								<h5 class="card-title">First publish: <span class="text-secondary">${getData.first_publish_year ? getData.first_publish_year : 'N/a'}</span></h5>
							</div>
						</div> 
					`
				row.appendChild(col);

				// Hide No Result Found Text
				noFoundResultText.style.display = "none";
			});

			// Hide Spinner
			spinner.style.display = "none";
		};
	};
};