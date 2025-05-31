const faq = {
  "what is smart waste management": "Smart waste management uses technology like IoT, sensors, and data analytics to improve waste collection, recycling, and disposal.",
  "how do smart bins work": "Smart bins are equipped with sensors that detect the fill level and notify waste collection systems when they need to be emptied.",
  "what are the benefits of smart waste management": `Smart Waste Management provides:
1. Optimized waste collection via sensors
2. Reduced fuel and labor costs
3. Overflow prevention
4. Better data insights for cities
5. Environmental impact reduction
6. Better recycling and citizen engagement
7. Integration with smart city systems`,
  "how does iot help in waste management": "IoT devices monitor bin status in real time and send data to a centralized platform for efficient route planning and timely pickups.",
  "what is waste segregation": "It is the process of separating biodegradable and non-biodegradable waste at the source to improve recycling and disposal.",
  "what is route optimization in waste collection": "It uses real-time data and algorithms to plan the most efficient path for garbage trucks, saving fuel and time.",
  "how are sensors used in smart bins": "Sensors measure fill level, temperature, and even detect hazardous gases in some advanced systems.",
  "how does gps help in smart waste management": "GPS enables real-time tracking of waste collection vehicles and ensures adherence to optimized routes.",
  "what is e-waste": "E-waste refers to discarded electronic devices like phones, computers, and batteries that require special disposal methods.",
  "what are hazardous wastes": "Hazardous wastes include chemicals, batteries, medical waste, and materials that are toxic, flammable, or corrosive.",
  "what is the smart city mission": "It is a Government of India initiative to promote sustainable and inclusive cities using technology, including smart waste systems."
};

function findAnswer(message) {
  const query = message.toLowerCase();
  for (const key in faq) {
    if (query.includes(key)) {
      return faq[key];
    }
  }
  return "Sorry, I can only have answer to that. Please try asking another question.";
}

const chatBotController = (req, res) => {
  const question = req.body.message;
  const reply = findAnswer(question);
  res.json({ reply });
};

module.exports = { chatBotController };
