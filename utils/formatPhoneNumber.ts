export default function formatPhoneNumber(phone: string) {
    let formatedPhone = '';
  
    if (!phone.length || phone.length < 10) return formatedPhone;
  
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      if (i > 0 && i % 2 === 0) {
        formatedPhone += '.';
      }
      formatedPhone += phone[i];
    }
  
    return formatedPhone;
  }