export default function ($el) {
  try {
    return $el.scrollTop() + $el.outerHeight(true);
  } catch (error) {
    return undefined;
  }
}
