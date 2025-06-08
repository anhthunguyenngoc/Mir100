import { BaseAction, MissionGroupStyles } from './BaseAction';

const LogicAction = Object.create(BaseAction);
LogicAction.color = MissionGroupStyles.logic.color;
LogicAction.icon = MissionGroupStyles.logic.icon;

export const PromptUserAction = Object.create(LogicAction);
PromptUserAction.name = 'Prompt user';
PromptUserAction.actionType = 'prompt_user';
// PromptUserAction.parameters = { question: "" };
PromptUserAction.execute = function (context) {
  const question = this.parameters.question || 'No question';
  console.log(`Prompting user: ${question}`);
  // Giao diện hoặc API gọi ngoài thực tế
};

export const IfAction = Object.create(LogicAction);
IfAction.name = 'If';
IfAction.actionType = 'if';
// IfAction.parameters = {
//   condition: {
//     type: "compare", // hoặc: expression | function | composite
//     operator: "==",
//     left: "battery",
//     right: 50
//   }
// };
IfAction.thenActions = [];
IfAction.elseActions = [];

IfAction.evaluateCondition = function (context) {
  const c = this.parameters.condition;
  switch (c.type) {
    case 'compare':
      const left = typeof c.left === 'string' ? context[c.left] : c.left;
      const right = typeof c.right === 'string' ? context[c.right] : c.right;
      switch (c.operator) {
        case '==':
          return left == right;
        case '!=':
          return left != right;
        case '>':
          return left > right;
        case '<':
          return left < right;
        case '>=':
          return left >= right;
        case '<=':
          return left <= right;
      }
      return false;
    case 'expression':
      return eval(c.expression);
    case 'function':
      return c.function(context);
    case 'composite':
      const results = c.compositeConditions.map((cond) => {
        return IfAction.evaluateCondition.call(
          { parameters: { condition: cond } },
          context
        );
      });
      return c.compositeOperator === 'AND'
        ? results.every(Boolean)
        : results.some(Boolean);
    default:
      return false;
  }
};

IfAction.execute = function (context) {
  const result = this.evaluateCondition(context);
  const actions = result ? this.thenActions : this.elseActions;
  actions.forEach((a) => a.execute(context));
};

export const WhileAction = Object.create(LogicAction);
WhileAction.name = 'While';
WhileAction.actionType = 'while';
// WhileAction.parameters = {
//   condition: {
//     type: "expression",
//     expression: "context.battery > 20 && context.status !== 'error'"
//   }
// };
WhileAction.bodyActions = [];
WhileAction.evaluateCondition = IfAction.evaluateCondition;
WhileAction.execute = function (context) {
  while (this.evaluateCondition(context)) {
    for (const action of this.bodyActions) {
      action.execute(context);
      if (context.shouldBreak) {
        context.shouldBreak = false;
        return;
      }
      if (context.shouldReturn) return;
    }
  }
};

export const LoopAction = Object.create(LogicAction);
LoopAction.name = 'Loop';
LoopAction.actionType = 'loop';
LoopAction.parameters = {
  iterations: 1,
};
LoopAction.bodyActions = [];
LoopAction.execute = function (context) {
  for (let i = 0; i < this.parameters.iterations; i++) {
    for (const action of this.bodyActions) {
      action.execute(context);
      if (context.shouldBreak) {
        context.shouldBreak = false;
        return;
      }
      if (context.shouldContinue) {
        context.shouldContinue = false;
        break;
      }
      if (context.shouldReturn) return;
    }
  }
};

export const BreakAction = Object.create(LogicAction);
BreakAction.name = 'Break';
BreakAction.actionType = 'break';
BreakAction.execute = function (context) {
  context.shouldBreak = true;
};

export const ContinueAction = Object.create(LogicAction);
ContinueAction.name = 'Continue';
ContinueAction.actionType = 'continue';
ContinueAction.execute = function (context) {
  context.shouldContinue = true;
};

export const ReturnAction = Object.create(LogicAction);
ReturnAction.name = 'Return';
ReturnAction.actionType = 'return';
ReturnAction.execute = function (context) {
  context.shouldReturn = true;
};

export const PauseAction = Object.create(LogicAction);
PauseAction.name = 'Pause';
PauseAction.actionType = 'pause';
PauseAction.execute = function (context) {
  console.log('Mission paused...');
  context.isPaused = true;
};

export const WaitAction = Object.create(LogicAction);
WaitAction.name = 'Wait';
WaitAction.actionType = 'wait';
WaitAction.parameters = {
  time: '00:00:05.000000', // ISO duration
};
WaitAction.execute = function (context) {
  const ms = parseDurationToMs(this.parameters.time);
  console.log(`Waiting for ${ms} ms...`);
  const start = Date.now();
  while (Date.now() - start < ms) {}
};
function parseDurationToMs(duration) {
  const [h, m, s] = duration.split(':');
  return +h * 3600000 + +m * 60000 + parseFloat(s) * 1000;
}
