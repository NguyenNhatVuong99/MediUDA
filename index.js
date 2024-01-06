const date1 = new Date();
const x = "04-01-2024";
const parts = x.split('-'); // Split the string into an array ["08", "01", "2024"]

// Extract the day, month, and year from the parts array
const day = parseInt(parts[0], 10);
const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
const year = parseInt(parts[2], 10);
const date2 = new Date(year, month, day);

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const formattedDate1 = formatDate(date1);
const formattedDate2 = formatDate(date2);

if (formattedDate1 === formattedDate2) {
    console.log("The dates are the same.");
} else if (formattedDate1 < formattedDate2) {
    console.log("date1 is earlier than date2");
} else {
    console.log("date1 is later than date2");
}