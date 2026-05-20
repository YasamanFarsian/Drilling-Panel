const generateComponent = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
  templateFile: 'plop-templates/Component.tsx.hbs',
};
const generateStyle = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.style.ts',
  templateFile: 'plop-templates/Component.style.ts.hbs',
};
const generateTest = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
  templateFile: 'plop-templates/Component.test.tsx.hbs',
};
const generateIndex = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/index.ts',
  templateFile: 'plop-templates/index.ts.hbs',
};
const generateProvider = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
  templateFile: 'plop-templates/Provider.tsx.hbs',
};
const generateProviderTest = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
  templateFile: 'plop-templates/Provider.test.tsx.hbs',
};
const generateStory = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}.stories.tsx',
  templateFile: 'plop-templates/Story.stories.tsx.hbs',
};
const generateWidget = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
  templateFile: 'plop-templates/Widget.tsx.hbs',
};
const generateWidgetChart = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/components/{{pascalCase name}}Chart/{{pascalCase name}}Chart.tsx',
  templateFile: 'plop-templates/WidgetChart.tsx.hbs',
};
const generateWidgetTest = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
  templateFile: 'plop-templates/Widget.test.tsx.hbs',
};
const generateWidgetHook = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/hooks/use{{pascalCase name}}.ts',
  templateFile: 'plop-templates/widgetHook.ts.hbs',
};
const generateWidgetHelper = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/helpers/{{camelCase name}}Helper.ts',
  templateFile: 'plop-templates/widgetHelper.ts.hbs',
};
const generateWidgetHelperTest = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/helpers/{{camelCase name}}Helper.test.ts',
  templateFile: 'plop-templates/widgetHelper.test.ts.hbs',
};
const generateWidgetTypes = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}Types.ts',
  templateFile: 'plop-templates/WidgetTypes.ts.hbs',
};
const generateWidgetStyle = {
  type: 'add',
  path: 'src/{{path}}/{{pascalCase name}}/{{pascalCase name}}.style.ts',
  templateFile: 'plop-templates/Widget.style.ts.hbs',
};

const questions = {
  componentName: {
    type: 'input',
    name: 'name',
    message: 'What is your component name?',
  },
  path: {
    type: 'input',
    name: 'path',
    message: 'Where should it be generated? (/src/{{YOUR_PATH}})',
    default: 'components',
  },
};

module.exports = (plop) => {
  /**
   * helpers
   * */
  plop.setHelper('uniqueId', function (text) {
    return Date.now();
  });

  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [questions.componentName, questions.path],
    actions: [generateComponent, generateStyle, generateTest, generateIndex],
  });
  plop.setGenerator('provider', {
    description: 'Create a context provider',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your provider name?',
      },
      { ...questions.path, default: 'providers' },
    ],
    actions: [generateProvider, generateProviderTest, generateIndex],
  });
  plop.setGenerator('widget', {
    description: 'Create a widget',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your widget name?',
      },
      { ...questions.path, default: 'widgets' },
    ],
    actions: [
      generateWidget,
      generateWidgetTest,
      generateWidgetHook,
      generateWidgetHelper,
      generateWidgetHelperTest,
      generateWidgetTypes,
      generateWidgetStyle,
      generateIndex,
      generateWidgetChart,
    ],
  });
  plop.setGenerator('story', {
    description: 'Create a story',
    prompts: [questions.componentName, questions.path],
    actions: [generateStory],
  });
};
