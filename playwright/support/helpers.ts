export function generateOrderCode(pattern = 'N L N N N L') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    const map = {
      'L': letters,
      'N': numbers
    };
  
    return 'VLO-' + pattern
      .split(' ')
      .map(p => map[p].charAt(Math.floor(Math.random() * map[p].length)))
      .join('');
  }
  
