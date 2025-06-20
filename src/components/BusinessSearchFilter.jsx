function BusinessSearch () {
   return( 
   <div className="search-filter">
        <button className="filter-dropdown-button">Location</button>
        <button className="filter-dropdown-button">Categories</button>
        <input type="text" placeholder=" e.g. 'Builders near Mutare'"/>
        <button className="search-button">Search</button>
    </div>)
    

}

export default BusinessSearch;