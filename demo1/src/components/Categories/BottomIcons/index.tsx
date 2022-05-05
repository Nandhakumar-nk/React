function BottomIcons() {
    const icons = [
      "email_outlined",
      "date_range_outlined",
      "people_alt_outlined",
      "attach_file_outlined",
      "done_outline_outlined",
    ];
    const elements = icons.map((icon, index) => {
      return (
        <div className="left-bottom-icons-container grey-red-bg" key={index}>
          <i className="material-icons left-bottom-icons">{icon}</i>
        </div>
      );
    });
  
    return <div className="left-bottom-container">{elements}</div>;
  }