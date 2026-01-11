const units = {
    length: { meters: 1, kilometers: 1000, miles: 1609.34, feet: 0.3048 },
    mass: { kilograms: 1, grams: 0.001, pounds: 0.453592, ounces: 0.0283495 },
    temp: 'special' // Temperatures use formulas, not ratios
};

const categorySelect = document.getElementById('category');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputVal = document.getElementById('inputValue');
const outputVal = document.getElementById('outputValue');
const saveBtn = document.getElementById('saveBtn');
const savedList = document.getElementById('savedList');

// Initialize Dropdowns
function updateUnits() {
    const cat = categorySelect.value;
    const options = cat === 'temp' 
        ? ['Celsius', 'Fahrenheit', 'Kelvin'] 
        : Object.keys(units[cat]);
    
    [fromUnit, toUnit].forEach(select => {
        select.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
    });
    convert();
}

function convert() {
    const val = parseFloat(inputVal.value);
    if (isNaN(val)) {
        outputVal.value = "";
        return;
    }

    const cat = categorySelect.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    let result;
    if (cat === 'temp') {
        result = convertTemperature(val, from, to);
    } else {
        const valueInBase = val * units[cat][from];
        result = valueInBase / units[cat][to];
    }
    outputVal.value = result.toFixed(4);
}

function convertTemperature(v, from, to) {
    let c;
    if (from === 'Celsius') c = v;
    else if (from === 'Fahrenheit') c = (v - 32) * 5/9;
    else c = v - 273.15;

    if (to === 'Celsius') return c;
    if (to === 'Fahrenheit') return (c * 9/5) + 32;
    return c + 273.15;
}

// Save to List
saveBtn.addEventListener('click', () => {
    if (!outputVal.value) return;
    const text = `${inputVal.value} ${fromUnit.value} = ${outputVal.value} ${toUnit.value}`;
    const li = document.createElement('li');
    li.textContent = text;
    savedList.prepend(li);
});

// Event Listeners
categorySelect.addEventListener('change', updateUnits);
[inputVal, fromUnit, toUnit].forEach(el => el.addEventListener('input', convert));

// Run on Load
updateUnits();