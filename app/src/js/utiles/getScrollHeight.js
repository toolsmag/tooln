export default function ($el) {
  try {
    return $el.prop('scrollHeight');
  } catch (error) {
    return undefined;
  }
}