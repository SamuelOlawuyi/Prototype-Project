import loadingImg from '../../assets/loading.gif';

export default function Loading() {
  return (
    <div id="loading-screen">
      <img src={loadingImg} alt="loading" />
    </div>
  );
}