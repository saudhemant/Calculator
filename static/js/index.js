const input_label = document.querySelector('.form-control');
const numbers_btn = document.querySelectorAll('.num');
const operations_btn = document.querySelectorAll('.operator');

// Operating with buttons
clickEventFor(numbers_btn);
clickEventFor(operations_btn);

function clickEventFor(x) {
    x.forEach(function(y) {
        y.addEventListener('click', function() {
            if(['NaN', 'Infinity'].includes(input_label.value)) {
                clear();
            }
            input_label.value += y.textContent;
        })
    })
}


const equals_btn = document.querySelector('.equals');
equals_btn.addEventListener('click', function() {
    result();
});

const clear_btn = document.querySelector('.clear');
clear_btn.addEventListener('click', function() {
    clear();
})

const backspace_btn = document.querySelector('.backspace');
backspace_btn.addEventListener('click', function() {
    single_backspace();
});


// Operating with keyboard
window.addEventListener('keydown', function(e) {
    const allowed_values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '%', '.']
    if(allowed_values.includes(e.key)) {
        if(['NaN', 'Infinity'].includes(input_label.value)) {
            clear();
        }
        key_pressed(e.key);
        input_label.value += e.key;
    } else if('Enter' === e.key) {
        key_pressed(e.key);
        result();
    } else if('c' === e.key.toLowerCase()) {
        key_pressed(e.key.toLowerCase());
        clear();
    } else if('Backspace' === e.key) {
        key_pressed(e.key);
        single_backspace();
    } else if('d' === e.key.toLowerCase()) {
        key_pressed('00');
        input_label.value += '00';
    }
    if('+' === e.key && e.shiftKey) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '+' && event.shiftKey) {
        event.preventDefault();
    }
});
  
// Helping functions for above event listeners
function result() {
    if(input_label.value != '') {
        try {
            if(input_label.value.includes('%')) {
                const parts = input_label.value.split('%');
                if(parts.length === 2) {
                    if(!isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1]))) {
                        input_label.value = eval(parseFloat(parts[0]) * parseFloat(parts[1]) / 100);
                    }
                }
            }
            input_label.value = eval(input_label.value);
        } catch { 
            single_backspace();
        }
    }
}

function clear() {
    input_label.value = "";
}

function single_backspace() {
    let value = input_label.value;
    input_label.value = value.substring(0, value.length - 1);
}

function key_pressed(key) {
    const corresponding_btn = document.querySelector(`button[data-key="${key}"]`);
    if(corresponding_btn) {
        corresponding_btn.style.borderStyle = 'inset';
        setTimeout(function() {
            corresponding_btn.style.borderStyle = 'outset';
        }, 80);
    }
}
