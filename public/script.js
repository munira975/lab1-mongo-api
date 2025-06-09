const API_URL = '/api/dishes';

document.addEventListener('DOMContentLoaded', () => {
  loadDishes();
  document.getElementById('dishForm').addEventListener('submit', handleAddDish);
});

async function loadDishes() {
  const res = await fetch(API_URL);
  const dishes = await res.json();
  const table = document.getElementById('dishTableBody');
  table.innerHTML = '';

  dishes.forEach(dish => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input value="${dish.name}" disabled /></td>
      <td><input value="${dish.ingredients.join(', ')}" /></td>
      <td><input value="${dish.preparationSteps.join(', ')}" /></td>
      <td><input type="number" value="${dish.cookingTime}" /></td>
      <td><input value="${dish.origin}" /></td>
      <td>
        <select>
          ${['Mild', 'Medium', 'Hot'].map(level => 
            `<option value="${level}" ${dish.spiceLevel === level ? 'selected' : ''}>${level}</option>`
          ).join('')}
        </select>
      </td>
      <td>
        <button class="update" onclick="updateDish('${dish._id}', this)">Update</button>
        <button class="delete" onclick="deleteDish('${dish._id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

async function handleAddDish(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value.trim(),
    ingredients: form.ingredients.value.split(',').map(i => i.trim()),
    preparationSteps: form.preparationSteps.value.split(',').map(s => s.trim()),
    cookingTime: parseInt(form.cookingTime.value),
    origin: form.origin.value.trim(),
    spiceLevel: form.spiceLevel.value
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.status === 201) {
    form.reset();
    loadDishes();
  } else {
    const msg = await res.json();
    alert(msg.message || 'Error adding dish.');
  }
}

async function updateDish(id, btn) {
  const row = btn.closest('tr');
  const inputs = row.querySelectorAll('input, select');
  const updated = {
    name: inputs[0].value.trim(), 
    ingredients: inputs[1].value.split(',').map(i => i.trim()),
    preparationSteps: inputs[2].value.split(',').map(s => s.trim()),
    cookingTime: parseInt(inputs[3].value),
    origin: inputs[4].value.trim(),
    spiceLevel: inputs[5].value
  };

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  });

  if (res.ok) {
    alert('Dish updated successfully.');
    loadDishes();
  } else {
    alert('Sorry! Failed to update.');
  }
}

async function deleteDish(id) {
  if (!confirm('Are you sure you want to delete this dish?')) return;

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    loadDishes();
  } else {
    alert('Oops! Failed to delete the dish.');
  }
}
