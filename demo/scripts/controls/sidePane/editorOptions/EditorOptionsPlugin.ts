import BuildInPluginState, { BuildInPluginProps, UrlPlaceholder } from '../../BuildInPluginState';
import getDefaultContentEditFeatureSettings from './getDefaultContentEditFeatureSettings';
import OptionsPane from './OptionsPane';
import SidePanePluginImpl from '../SidePanePluginImpl';
import { ExperimentalFeatures } from 'roosterjs-editor-types';
import { SidePaneElementProps } from '../SidePaneElement';

const initialState: BuildInPluginState = {
    pluginList: {
        contentEdit: true,
        hyperlink: true,
        paste: true,
        watermark: false,
        imageResize: true,
        cutPasteListChain: true,
        tableResize: true,
        customReplace: true,
        pickerPlugin: true,
        contextMenu: true,
    },
    contentEditFeatures: getDefaultContentEditFeatureSettings(),
    defaultFormat: {},
    linkTitle: 'Ctrl+Click to follow the link:' + UrlPlaceholder,
    watermarkText: 'Type content here ...',
    showRibbon: true,
    experimentalFeatures: [
        ExperimentalFeatures.ListChain,
        ExperimentalFeatures.MergePastedLine,
        ExperimentalFeatures.NewBullet,
        ExperimentalFeatures.NewIndentation,
        ExperimentalFeatures.NewNumbering,
    ],
};

export default class EditorOptionsPlugin extends SidePanePluginImpl<
    OptionsPane,
    BuildInPluginProps
> {
    constructor() {
        super(OptionsPane, 'options', 'Editor Options');
    }

    getBuildInPluginState(): BuildInPluginState {
        let result: BuildInPluginState;
        this.getComponent(component => (result = component.getState()));
        return result || initialState;
    }

    getComponentProps(base: SidePaneElementProps) {
        return {
            ...initialState,
            ...base,
        };
    }
}