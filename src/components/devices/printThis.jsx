import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }
  canvasEl;

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });
    setRef = (ref) => (this.canvasEl = ref);

  render() {
    const { text, image, name, id } = this.props;
    return (
      <div className="relativeCSS w-full h-full hidden">
        <style type="text/css" media="print">
          {"\
              @page { size: landscape; }\
          "}
        </style>

        <div className="flash" />
        <table className="table-auto text-left w-full">
          <thead className="border-b border-gray2 dark:border-opacity-60">
            <tr>
              <th scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase  whitespace-nowrap">Device ID</th>
              <th scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase  whitespace-nowrap">Device Name</th>
              <th scope="col" width="60%" className="px-4 xl:px-8 py-4 text-sm uppercase  whitespace-nowrap">QR Code</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td width="20%" className="px-4 xl:px-8 py-4 text-sm">{id}</td>
              <td width="20%" className="px-4 xl:px-8 py-4 text-sm capitalize">{name}</td>
              <td width="60%" className="px-4 xl:px-8 py-4 text-sm">
                <img alt="A test" src={image} width="150" height="150" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} text={props.text} />;
});
