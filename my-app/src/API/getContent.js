import fakeNetwork from './core/fakenetwork';

export async function loader({ params }) {
  await fakeNetwork();
  return params.contentId;
}
