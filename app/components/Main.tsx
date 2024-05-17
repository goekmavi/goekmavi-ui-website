const Main = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <main className="container mx-auto pt-28">
            { children }
        </main>
    )
}

export default Main;