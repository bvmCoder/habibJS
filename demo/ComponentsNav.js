import * as React from 'react';
import { Nav } from './Nav/';
import { NavGroup } from './Nav/NavGroup';
import { NavGroupItem } from './Nav/NavGroupItem';
import { Route, IndexRoute } from 'react-router';
import { ButtonsPattern } from './Content/Patterns/ButtonsPattern';
import { ButtonGroupPattern } from './Content/Patterns/ButtonGroupPattern';
import { NavMenuPattern } from './Content/Patterns/NavMenuPattern';
import { ButtonToolbarPattern } from './Content/Patterns/ButtonToolbarPattern';
import { LinksPattern } from './Content/Patterns/LinksPattern';
import { GridPattern } from './Content/Patterns/GridPattern';
import { TabsPattern } from './Content/Patterns/TabsPattern';
import { LabelPattern } from './Content/Patterns/LabelPattern';
import { SpinnerPattern } from './Content/Patterns/SpinnerPattern';
import { RadioPattern } from './Content/Patterns/RadioPattern';
import { DropdownPattern } from './Content/Patterns/DropdownPattern';
import { DropdownListPattern } from './Content/Patterns/DropdownListPattern';
import { PagerPattern } from './Content/Patterns/PagerPattern';
import { ModalPattern } from './Content/Patterns/ModalPattern';
import { TextBoxPattern } from './Content/Patterns/TextBoxPattern';
import { CheckBoxPattern } from './Content/Patterns/CheckBoxPattern';
import { TablePattern } from './Content/Patterns/TablePattern';
import { AdvancedTablePattern } from './Content/Patterns/AdvancedTablePattern';
import { DateInputPattern } from './Content/Patterns/DateInputPattern';
import { AccordionPattern } from './Content/Patterns/AccordionPattern';
import { PanelPattern } from './Content/Patterns/PanelPattern';
import { PanelGroupPattern } from './Content/Patterns/PanelGroupPattern';
import { DrawersPattern } from './Content/Patterns/DrawersPattern';
import { PopoverPattern } from './Content/Patterns/PopoverPattern';
import { TypeaheadPattern } from './Content/Patterns/TypeaheadPattern';
import { TreePattern } from './Content/Patterns/TreePattern';
import { ToggleButtonPattern } from './Content/Patterns/ToggleButtonPattern';
import { MultiDropdownPattern } from './Content/Patterns/MultiDropdownPattern';
import { IconPattern } from './Content/Patterns/IconPattern';
import { LiteTablePattern } from './Content/Patterns/LiteTablePattern';
import ReactTablePattern from './Content/Patterns/ReactTablePattern';
import { DrillDownPattern } from './Content/Patterns/DrillDownPattern';
import { ComboBoxPattern } from './Content/Patterns/ComboBoxPattern';
import { AlertBannerPattern } from './Content/Patterns/AlertBannerPattern';
import {TooltipPattern} from './Content/Patterns/TooltipPattern';

export const ComponentRoutes = [
    <IndexRoute component={ButtonsPattern} key="index"/>,
    <Route path='Button' component={ButtonsPattern} key="Button"/>,
    <Route path='ButtonGroup' component={ButtonGroupPattern} key="ButtonGroup"/>,
    <Route path='Navigation-Menu' component={NavMenuPattern} key="Navigation-Menu"/>,
    <Route path='ButtonToolbar' component={ButtonToolbarPattern} key="ButtonToolbar"/>,
    <Route path='Link' component={LinksPattern} key="Link"/>,
    <Route path='Grid' component={GridPattern} key="Grid"/>,
    <Route path='Tabs' component={TabsPattern} key="Tabs"/>,
    <Route path='Label' component={LabelPattern} key="Label"/>,
    <Route path='Dropdown' component={DropdownPattern} key="Dropdown"/>,
    <Route path='MultiDropdown' component={MultiDropdownPattern} key="MultiDropdown"/>,
    <Route path='Spinner' component={SpinnerPattern} key="Spinner"/>,
    <Route path='RadioButton' component={RadioPattern} key="RadioButton"/>,
    <Route path='DropdownList' component={DropdownListPattern} key="DropdownList"/>,
    <Route path='Pager' component={PagerPattern} key="Pager"/>,
    <Route path='Modal' component={ModalPattern} key="Modal"/>,
    <Route path='TextBox' component={TextBoxPattern} key="TextBox"/>,
    <Route path='CheckBox' component={CheckBoxPattern} key="CheckBox"/>,
    <Route path='Table' component={TablePattern} key="Table"/>,
    <Route path='AdvancedTable' component={AdvancedTablePattern} key="AdvancedTable"/>,
    <Route path='LiteTable' component={LiteTablePattern} key="LiteTable"/>,
    <Route path='DateInput' component={DateInputPattern} key="DateInput"/>,
    <Route path='Accordion' component={AccordionPattern} key="Accordion"/>,
    <Route path='Panel' component={PanelPattern} key="Panel"/>,
    <Route path='PanelGroup' component={PanelGroupPattern} key="PanelGroup"/>,
    <Route path='Drawers' component={DrawersPattern} key="Drawers"/>,
    <Route path='Popover' component={PopoverPattern} key="Popover"/>,
    <Route path='Typeahead' component={TypeaheadPattern} key="Typeahead"/>,
    <Route path='Tree' component={TreePattern} key="Tree"/>,
    <Route path='ToggleButton' component={ToggleButtonPattern} key="ToggleButton"/>,
    <Route path='Icon' component={IconPattern} key="Icon"/>,
    <Route path='ReactTable' component={ReactTablePattern} key="ReactTable"/>,
    <Route path='DrillDown' component={DrillDownPattern} key="DrillDown"/>,
    <Route path='ComboBox' component={ComboBoxPattern} key="ComboBox"/>,
    <Route path='AlertBanner' component={AlertBannerPattern} key="AlertBanner"/>,
    <Route path='Tooltip' component={TooltipPattern} key="Tooltip"/>    
];
export class ComponentsNav extends React.Component {
    render() {
        return (<Nav page='components'>
        <NavGroup name='Buttons'>
            <NavGroupItem name='Button'/>
            <NavGroupItem name='ButtonGroup'/>
            <NavGroupItem name='ButtonToolbar'/>
            <NavGroupItem name='ToggleButton'/>
        </NavGroup>
        <NavGroup name='Links'>
            <NavGroupItem name='Link'/>
        </NavGroup>
        <NavGroup name='Page Layout'>
            <NavGroupItem name='Grid'/>
            <NavGroupItem name='Panel'/>
            <NavGroupItem name='PanelGroup'/>
        </NavGroup>
        <NavGroup name='Navigation'>
            <NavGroupItem name='Navigation Menu'/>
            <NavGroupItem name='Tabs'/>
            <NavGroupItem name='Accordion'/>
            <NavGroupItem name='Pager'/>            
        </NavGroup>
        <NavGroup name='Overlays'>
            <NavGroupItem name='Modal'/>
            <NavGroupItem name='Tooltip'/>
            <NavGroupItem name='Popover'/>
            <NavGroupItem name='Drawers'/>
        </NavGroup>
        <NavGroup name='Forms'>
            <NavGroupItem name='Label'/>
            <NavGroupItem name='CheckBox'/>
            <NavGroupItem name='Dropdown'/>
            <NavGroupItem name='TextBox'/>
            <NavGroupItem name='RadioButton'/>
            <NavGroupItem name='DateInput'/>
            <NavGroupItem noop name='Toolbar'/>
            <NavGroupItem name='Tree'/>
            <NavGroupItem name='Typeahead'/>
            <NavGroupItem noop name='ComboBox'/> { /* Dali: disabled - this will soon be removed - combined Dropdown version is in progress */}
            <NavGroupItem name='MultiDropdown'/> { /* Dali: disabled - this will soon be removed - use Dropdown component instead */}
            <NavGroupItem name='DropdownList'/> { /* Dali: disabled - this will soon be removed - use Dropdown component instead */}            
        </NavGroup>
        <NavGroup name='Tables'>
            <NavGroupItem name='Table'/>
            {/* we should not be introducing new components to the nav unless they are in UX Framework or while in early development state. 
                You can still navigate even if link is not available in the nav. 
            <NavGroupItem name='ReactTable'/>
            <NavGroupItem name='DrillDown'/>
            */ }
        </NavGroup>
        <NavGroup name='Alerts'>
            <NavGroupItem name='AlertBanner'/>            
        </NavGroup>
        <NavGroup name='Progress Bars'>
            <NavGroupItem name='Spinner'/>
        </NavGroup>
        <NavGroup name='Media'>
            <NavGroupItem name='Icon'/>
        </NavGroup>
      </Nav>);
    }
}
