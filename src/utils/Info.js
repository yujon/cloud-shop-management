export const showShort = (content,title="警告",timeout=2000) => {
  const ref = Modal.info({
    title,
    content,
  });
  setTimeout(() => {
    ref.destroy();
  }, timeout)
};

