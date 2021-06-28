import axios from 'axios';

function status() {
  const connected = localStorage.getItem('connected');
  return connected ? JSON.parse(connected) : false;
}

async function connect() {
  try {
    await axios.get('http://127.0.0.1:4432/api/status');
    localStorage.setItem('connected', 'true');
    return {
      connected: true,
    };
  } catch (err) {
    console.log(err)
    localStorage.setItem('connected', 'false');
    return {
      connected: false,
    }
  }
}
function disconnect() {
  localStorage.setItem('connected', 'false');
}

export default {
  status,
  connect,
  disconnect,
}
