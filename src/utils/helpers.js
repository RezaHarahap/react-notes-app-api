function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(date));
}

function stripHtml(value) {
  const element = document.createElement('div');
  element.innerHTML = value;
  return element.textContent || element.innerText || '';
}

export { formatDate, stripHtml };
