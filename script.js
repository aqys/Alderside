document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#birthdate", {
        dateFormat: "d/m/Y",
        onChange: function(selectedDates) {
            const birthdate = new Date(selectedDates[0]);
            const today = new Date();
            const age = calculateAge(birthdate);
            let ageText;

            if (birthdate.toDateString() === today.toDateString()) {
                ageText = "Du er 0 dage gammel.";
            } else if (birthdate > today) {
                const daysDifference = Math.ceil((birthdate - today) / (1000 * 60 * 60 * 24));
                ageText = `Du er -${daysDifference} dage gammel.`;
            } else {
                ageText = `Du er ${formatAge(age)} gammel.`;
            }

            document.getElementById('age-result').textContent = ageText;
        }
    });
});

function calculateAge(birthdate) {
    const today = new Date();
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) { 
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--; 
        months += 12; 
    }

    return { years, months, days };
}

function formatAge(age) {
    const parts = [];
    if (age.years > 0) parts.push(`${age.years} år`);
    if (age.months === 1) { // hvis resultatet er 1 måned istedet for flere siger vi 'måned' og ikke 'måneder'
        parts.push('1 måned');
    } else if (age.months > 0) {
        parts.push(`${age.months} måneder`);
    }
    if (age.days === 1) { // hvis resultatet er 1 dag istedet for flere siger vi 'dag' og ikke 'dage'
        parts.push('1 dag');
    } else if (age.days > 0) {
        parts.push(`${age.days} dage`);
    }
    return parts.join(', '); // sæt dem sammen med komma og mellemrum.
}

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('blur', () => {
        input.style.backgroundColor = '#202020';
        input.style.borderColor = '#424242a6';
        input.style.outline = 'none';
        input.style.boxShadow = 'none';
        input.style.transform = 'scale(1)';
    });
});