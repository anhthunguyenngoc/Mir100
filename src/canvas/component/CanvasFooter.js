import * as Comp from '../../components';

export const CanvasFooter = ({ setIsContinuosLine }) => {
  return (
    <div className="flex row align-center gap-10px">
        <Comp.Toggle label="Auto Snap point"/>

        <Comp.Checkbox label="End point"/>
        <Comp.Checkbox label="Mid point"/>
        <Comp.Checkbox label="Intersection"/>
        <Comp.Checkbox label="Grid"/>

        <Comp.Toggle label="Continuous line"/>
      
    </div>
  );
};
