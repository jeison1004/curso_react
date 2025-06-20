

const CardPeliculas = ({item}) => {
  return (
    <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4" >
        <div className="card h-100">
        <div className="card-header p-0">
            <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="img-fluid" alt="..." />
        </div>
        <div className="card-body text-center">
            <p>{item.title || item.name}</p>
            <p>Popularidad <span className="badge rounded-pill p-1 bg-danger "> {parseInt(item.popularity)}</span></p>
        </div>
        <div className="card-footer text-center me-2">
            <a href="*" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
        </div>
        </div>

            <div>
       
        {/* Modal */}
        <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{item.title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                <div className="row">
                    <div className="col-md-4">
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                        <p className="fs-3">{item.title}</p>
                        <p className="fs-5">Descripcion: {item.overview}</p>
                        <p className="fs-3">Popularidad: {item.popularity}</p>
                        <p className="fs-5 text-danger fw-bold">Valoracion: {item.vote_average}$/10</p>
                    </div>
                </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
            </div>
        </div>
        </div>



    </div>
  )
}

export default CardPeliculas