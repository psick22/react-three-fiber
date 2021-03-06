export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} />
      <spotLight position={[0, 1000, 0]} intensity={1} />
    </>
  );
}
