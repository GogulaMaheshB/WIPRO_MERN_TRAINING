const withLoader = (WrappedComponent) => {
  return function LoaderComponent({ loading, ...props }) {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        </div>
      )
    }
    return <WrappedComponent {...props} />
  }
}

export default withLoader
