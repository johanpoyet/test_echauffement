const readline = require('readline');

const translations = {
  fr: {
    morning: 'Bonjour',
    evening: 'Bonsoir',
    well_said: 'Bien dit !',
    goodbye_morning: 'Au revoir',
    goodbye_evening: 'Bonne soirée',
    prompt: "Entrez un mot (ou 'exit' pour quitter) : "
  },
  en: {
    morning: 'Good morning',
    evening: 'Good evening',
    well_said: 'Well said!',
    goodbye_morning: 'Goodbye',
    goodbye_evening: 'Have a good evening',
    prompt: "Enter a word (or 'exit' to quit): "
  }
};

function getTimePeriod() {
  const hour = new Date().getHours();
  return (hour >= 5 && hour < 18) ? 'morning' : 'evening';
}

function isPalindrome(word) {
  const cleaned = word.toLowerCase().replace(/\s+/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askLanguage(callback) {
  rl.question("Choisissez une langue (fr, en) : ", (lang) => {
    if (translations[lang]) {
      callback(lang);
    } else {
      console.log("Langue inconnue. Réessayez.");
      askLanguage(callback);
    }
  });
}

function startApp(lang) {
  const period = getTimePeriod();
  console.log(translations[lang][period]);

  function askWord() {
    rl.question(translations[lang].prompt, (word) => {
      if (word.toLowerCase() === 'exit') {
        const goodbye = period === 'morning' ? 'goodbye_morning' : 'goodbye_evening';
        console.log(translations[lang][goodbye]);
        rl.close();
      } else {
        if (isPalindrome(word)) {
          console.log(translations[lang].well_said);
        }
        askWord();
      }
    });
  }

  askWord();
}

askLanguage(startApp);
