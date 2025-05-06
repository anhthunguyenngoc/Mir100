export const IOModule = () => (
  <div className="content">
    <div className="flex row full-width align-center space-between">
      <div className="flex col gap-5px">
        <h1>I/O modules</h1>
        <div className="row-5px">
          Create and configure I/O module connections.
          <button className="help-btn">
            <img
              className="help-btn-img"
              alt="Help"
              src="../../../images/help.svg"
              loading="lazy"
            />
          </button>
        </div>
      </div>

      <div className="row-5px">
        <button className="href-btn" id="create-io-module">
          <img
            className="plus-btn-img"
            alt="Create I/O connection"
            src="../../../images/plus.svg"
            loading="lazy"
          />
          Create I/O connection
        </button>
      </div>
    </div>

    <section>
      <table id="user-table">
        <thead>
          <tr>
            <th className="col-1"></th>
            <th className="col-2">Connection name</th>
            <th className="col-3">MAC address</th>
            <th className="col-n">Functions</th>
          </tr>
        </thead>
        <tbody>
          <td className="col-1" id="io-module-table-icon">
            <svg
              className="plus-btn-img"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-color-btn"
                d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
              />
              <path
                className="fill-color-btn"
                d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
              />
            </svg>
          </td>
          <td className="col-2" id="io-module-table-name">
            Connection name
          </td>
          <td className="col-3" id="io-module-table-address">
            MAC address
          </td>
          <td className="col-n" id="io-module-table-functions">
            <div className="row-5px">
              <button className="flex row">
                <img
                  className="plus-btn-img"
                  alt="Edit mission"
                  src="../../../images/connect.svg"
                  loading="lazy"
                />
                Connect
              </button>
              <button className="href-btn" id="edit-io-module">
                <img
                  className="plus-btn-img"
                  alt="Edit mission"
                  src="../../../images/edit.svg"
                  loading="lazy"
                />
              </button>
              <button className="del-btn href-btn" onClick="confirmDelete()">
                <img
                  className="plus-btn-img"
                  alt="Create io-module groups"
                  src="../../../images/bin.svg"
                  loading="lazy"
                />
              </button>
            </div>
          </td>
        </tbody>
      </table>
    </section>
  </div>
);
