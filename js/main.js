// Current Date and Time (UTC)
const currentDateTime = new Date('2026-02-19T01:03:44Z');

console.log('Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS):', currentDateTime.toISOString().replace('T', ' ').substring(0, 19));