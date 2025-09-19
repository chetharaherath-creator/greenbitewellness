document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Recipe Data (JSON Array) ---------- */
  const RECIPES = [
    {
      id: 'overnight-oats',
      title: 'Overnight Oats',
      desc: 'Creamy oats soaked overnight with fruit & nuts.',
      category: 'breakfast',
      time: '5 min prep',
      img: 'images/11.jpg',
      ingredients: [
        '½ cup rolled oats',
        '½ cup milk or yogurt',
        '1 tsp chia seeds',
        'Fruit (banana/berries)',
        'Nuts or seeds',
        'Honey (optional)'
      ],
      steps: [
        'Mix oats, milk/yogurt and chia in a jar.',
        'Refrigerate overnight.',
        'Top with fruit, nuts and a drizzle of honey.'
      ],
      nutrition: { Calories: 320, Protein: '12 g', Carbs: '48 g', Fat: '9 g' }
    },

    {
      id: 'pesto-pasta',
      title: 'Pesto Pasta',
      desc: 'Twirl a bowl of fresh & zesty pesto pasta.',
      category: 'lunch',
      time: '20 min',
      img: 'images/25.jpg',
      ingredients: [
        'Whole-wheat pasta 80 g',
        'Basil pesto 2 tbsp',
        'Cherry tomatoes',
        'Olive oil 1 tsp',
        'Parmesan (optional)',
        'Salt & pepper'
      ],
      steps: [
        'Cook pasta until al dente.',
        'Toss with pesto, oil and sliced tomatoes.',
        'Season and top with parmesan.'
      ],
      nutrition: { Calories: 450, Protein: '14 g', Carbs: '62 g', Fat: '15 g' }
    },

    {
      id: 'granola-bowl',
      title: 'Granola Bowl',
      desc: 'Yogurt topped with crunchy granola and fruit.',
      category: 'breakfast',
      time: '5 min',
      img: 'images/16.jpg',
      ingredients: [
        '1 cup yogurt',
        '¼ cup granola',
        'Fresh fruit',
        'Honey (optional)'
      ],
      steps: [
        'Add yogurt to a bowl.',
        'Top with granola and fruit.',
        'Drizzle honey if desired.'
      ],
      nutrition: { Calories: 300, Protein: '13 g', Carbs: '42 g', Fat: '9 g' }
    },

    {
      id: 'salmon-pasta',
      title: 'Salmon Pasta',
      desc: 'Protein-rich and comforting salmon pasta.',
      category: 'dinner',
      time: '25–30 min',
      img: 'images/21.jpg',
      ingredients: [
        'Pasta 80 g',
        'Salmon fillet 120 g',
        'Spinach',
        '2 cloves garlic',
        'Olive oil',
        'Lemon'
      ],
      steps: [
        'Cook pasta.',
        'Pan-sear salmon and flake it.',
        'Sauté garlic and spinach in oil; toss with pasta and salmon.',
        'Finish with lemon juice.'
      ],
      nutrition: { Calories: 520, Protein: '35 g', Carbs: '55 g', Fat: '17 g' }
    },

    {
      id: 'pumpkin-soup',
      title: 'Pumpkin Soup',
      desc: 'Silky, spiced pumpkin soup.',
      category: 'dinner',
      time: '25 min',
      img: 'images/22.jpg',
      ingredients: [
        'Pumpkin 400 g, cubed',
        '1 onion',
        '2 cloves garlic',
        '3 cups vegetable stock',
        'Milk/cream (optional)',
        'Cumin / pepper / salt'
      ],
      steps: [
        'Sauté onion and garlic until soft.',
        'Add pumpkin and stock; simmer until tender.',
        'Blend smooth; add milk/cream and spices.'
      ],
      nutrition: { Calories: 220, Protein: '5 g', Carbs: '32 g', Fat: '7 g' }
    },

    {
      id: 'carrot-soup',
      title: 'Carrot Soup',
      desc: 'Sweet & creamy carrot soup with herbs.',
      category: 'dinner',
      time: '20–25 min',
      img: 'images/23.jpg',
      ingredients: [
        'Carrots 400 g, sliced',
        '1 onion',
        '3 cups stock',
        'Olive oil',
        'Herbs',
        'Salt & pepper'
      ],
      steps: [
        'Sauté onion and carrots in oil 3–4 min.',
        'Add stock; simmer until carrots are soft.',
        'Blend and season.'
      ],
      nutrition: { Calories: 200, Protein: '4 g', Carbs: '30 g', Fat: '6 g' }
    },

    {
      id: 'smoothies',
      title: 'Green Smoothie',
      desc: 'Refreshing blend of spinach, banana and yogurt/milk.',
      category: 'snack',
      time: '5 min',
      img: 'images/14.jpg',
      ingredients: [
        'Spinach handful',
        '1 banana',
        '200 ml milk or yogurt',
        'Honey (optional)'
      ],
      steps: [
        'Add all ingredients to a blender.',
        'Blend until smooth.',
        'Serve cold.'
      ],
      nutrition: { Calories: 250, Protein: '9 g', Carbs: '42 g', Fat: '4 g' }
    },

    {
      id: 'lowcal-pizza',
      title: 'Low-Calorie Pizza',
      desc: 'A lighter slice with veggie toppings and less cheese.',
      category: 'dinner',
      time: '20 min',
      img: 'images/32.jpg',
      ingredients: [
        'Thin pizza base',
        'Tomato sauce',
        'Veggies (pepper, onion, mushroom)',
        'Light cheese',
        'Oregano'
      ],
      steps: [
        'Spread sauce on the base.',
        'Add veggies and a light layer of cheese.',
        'Bake 8–10 min until crisp.'
      ],
      nutrition: { Calories: 380, Protein: '18 g', Carbs: '52 g', Fat: '10 g' }
    },

    {
      id: 'salad',
      title: 'Fresh Salad Bowl',
      desc: 'Build a fresh, vibrant salad with simple dressing.',
      category: 'lunch',
      time: '10 min',
      img: 'images/24.jpg',
      ingredients: [
        'Leafy greens',
        'Cucumber',
        'Tomato',
        'Olive oil',
        'Lemon',
        'Salt & pepper'
      ],
      steps: [
        'Chop vegetables.',
        'Toss with oil, lemon, salt and pepper.',
        'Serve immediately.'
      ],
      nutrition: { Calories: 180, Protein: '5 g', Carbs: '16 g', Fat: '10 g' }
    }
  ];

  /* Expose to console when you type `recipes` */
  window.recipes = RECIPES;

  /* ---------- Render Cards ---------- */
  const grid = document.getElementById('recipeGrid');

  function renderCards(list) {
    grid.innerHTML = '';
    list.forEach(function (r) {
      const card = document.createElement('article');
      card.className = 'rcard';
      card.innerHTML = `
        <img src="${r.img}" alt="${r.title}">
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <a href="#" class="btn big" data-open="${r.id}">View Recipe</a>
      `;
      grid.appendChild(card);
    });
  }

  renderCards(RECIPES);

  /* ---------- Search + Category Filter ---------- */
  let activeFilter = 'all';
  const chips = document.querySelectorAll('.chip');
  const searchInput = document.getElementById('recipeSearch');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();

    const filtered = RECIPES.filter(function (r) {
      const byCat  = (activeFilter === 'all') || (r.category === activeFilter);
      const byText = !q || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
      return byCat && byText;
    });

    renderCards(filtered);
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  /* ---------- Modal ---------- */
  const modal            = document.getElementById('recipeModal');
  const modalImg         = document.getElementById('modalImg');
  const modalTitle       = document.getElementById('modalTitle');
  const modalDesc        = document.getElementById('modalDesc');
  const modalCategory    = document.getElementById('modalCategory');
  const modalTime        = document.getElementById('modalTime');
  const modalIngredients = document.getElementById('modalIngredients');
  const modalSteps       = document.getElementById('modalSteps');
  const modalNutrition   = document.getElementById('modalNutrition');

  function openModal(id) {
    const r = RECIPES.find(function (x) { return x.id === id; });
    if (!r) return;

    modalImg.src = r.img;
    modalImg.alt = r.title;

    modalTitle.textContent = r.title;
    modalDesc.textContent  = r.desc;
    modalCategory.textContent = r.category;
    modalTime.textContent     = r.time;

    modalIngredients.innerHTML = r.ingredients.map(function (i) {
      return '<li>' + i + '</li>';
    }).join('');

    modalSteps.innerHTML = r.steps.map(function (s) {
      return '<li>' + s + '</li>';
    }).join('');

    modalNutrition.innerHTML = Object.keys(r.nutrition).map(function (k) {
      return '<tr><td><strong>' + k + '</strong></td><td>' + r.nutrition[k] + '</td></tr>';
    }).join('');

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  // open via event delegation on the grid
  grid.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-open]');
    if (!btn) return;
    e.preventDefault();
    openModal(btn.getAttribute('data-open'));
  });

  // close on backdrop / X / Esc
  modal.addEventListener('click', function (e) {
    if (e.target.getAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

});
