function Header(props) {
  //const { characterData, removeCharacter } = props;
  return (
    <div className="header-container">
      <div className="top-left-container blue-bg">
        <i className="material-icons apps-icon">apps</i>
      </div>

      <p className="todo">To Do</p>

      <div className="top-middle-container white-bg">
        <i className="material-icons search-icon blue-icon">search_outlined</i>
        <input className="search-box" type="text" />
      </div>

      <div className="top-right-distance top-right-container blue-bg">
        <i className="fa fa-cog top-right-icons"></i>
      </div>
      <div className="top-right-container blue-bg">
        <i className="fa fa-question-circle top-right-icons"></i>
      </div>
      <div className="top-right-container blue-bg">
        <i className="fa fa-bullhorn top-right-icons"></i>
      </div>
      <div className="top-right-container blue-bg">
        <i className="fa fa-user top-right-icons"></i>
      </div>
    </div>
  );
}

export default Header;
