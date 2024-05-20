
process.stdin.resume();

// If SIGINT process is called then this will
// run first then the next line
process.on('SIGINT', () => {
  console.log('Hey Boss I just Received SIGINT.');
});

// We are using this single function to handle multiple signals
function handle(signal) {
  console.log(`So the signal which I have Received is: ${signal}`);
}

process.on('SIGINT', handle);
