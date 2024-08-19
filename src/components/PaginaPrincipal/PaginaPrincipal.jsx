const PaginaPrincipal = () => {
  return (
    <div style={styles.container}>
      <h1>Esta es la Página Principal</h1>
      <p>Bienvenido a tu aplicación React.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
};

export default PaginaPrincipal;