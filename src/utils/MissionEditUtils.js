/**
 * Cập nhật priority của action trong mảng actions theo action_type.
 * @param {Block[]} actions - Mảng các action.
 * @param {string} actionType - action_type cần cập nhật.
 * @param {number} newPriority - Giá trị priority mới.
 * @returns {Block[]} - Mảng actions đã cập nhật.
 */
export function updateActionPriorityInList(actions, actionType, newPriority) {
  return actions.map((action) => {
    if (action.action_type === actionType) {
      return { ...action, priority: newPriority };
    }
    return action;
  });
}

/**
 * Cập nhật giá trị parameter trong action theo action_type và parameter_id.
 * @param {Block[]} actions - Mảng actions.
 * @param {string} uniqueId - uniqueId của action cần sửa.
 * @param {string} parameterId - ID của parameter cần sửa.
 * @param {string|number|boolean} newValue - Giá trị mới.
 * @returns {Block[]} - Mảng actions đã cập nhật.
 */
export function updateParameterValueInList(
  actions,
  uniqueId,
  parameterId,
  newValue
) {
  return actions.map((action) => {
    if (action.uniqueId === uniqueId) {
      const updatedParams = action.parameters.map((param) =>
        param.id === parameterId ? { ...param, value: newValue } : param
      );
      return { ...action, parameters: updatedParams };
    }
    return action;
  });
}

export function updateSubTaskParameterValueInList(
  actions,
  uniqueId,
  subTaskUniqueId,
  scopeParamId,
  parameterId,
  newValue
) {
  return actions.map((action) => {
    if (action.uniqueId !== uniqueId) return action;

    const updatedSubTasks = {
      ...action.subTasks,
      [scopeParamId]: (action.subTasks?.[scopeParamId] || []).map((subTask) => {
        if (subTask.uniqueId !== subTaskUniqueId) return subTask;

        const updatedParams = subTask.parameters.map((param) =>
          param.id === parameterId ? { ...param, value: newValue } : param
        );

        return { ...subTask, parameters: updatedParams };
      }),
    };

    return { ...action, subTasks: updatedSubTasks };
  });
}

/**
 * Cập nhật cả priority và parameter.value của action theo action_type.
 * @param {Block[]} actions - Mảng actions.
 * @param {string} actionType - action_type của action.
 * @param {string} parameterId - ID của parameter.
 * @param {string|number|boolean} newValue - Giá trị mới cho parameter.
 * @param {number} newPriority - Giá trị priority mới.
 * @returns {Block[]} - Mảng actions đã cập nhật.
 */
export function updatePriorityAndParameterInList(
  actions,
  actionType,
  parameterId,
  newValue,
  newPriority
) {
  return actions.map((action) => {
    if (action.action_type === actionType) {
      const updatedParams = action.parameters.map((param) =>
        param.id === parameterId ? { ...param, value: newValue } : param
      );
      return {
        ...action,
        priority: newPriority,
        parameters: updatedParams,
      };
    }
    return action;
  });
}

export function updateTaskOrSubTaskProps(
  actions,
  taskId, // ID của task cha
  scopeParamId, // Nếu là subtask thì cần truyền scopeParamId
  subTaskId, // Nếu là subtask thì cần truyền subTaskId
  propsValue
) {
  return actions.map((task) => {
    if (task.uniqueId !== taskId) return task;

    // Cập nhật trực tiếp task nếu không có subTaskId
    if (!subTaskId) {
      return {
        ...task,
        ...propsValue,
      };
    }

    // Cập nhật subtask bên trong scopeParam
    const updatedSubTasks = {
      ...task.subTasks,
      [scopeParamId]: (task.subTasks?.[scopeParamId] || []).map((subTask) =>
        subTask.uniqueId === subTaskId ? { ...subTask, ...propsValue } : subTask
      ),
    };

    return {
      ...task,
      subTasks: updatedSubTasks,
    };
  });
}

// Hàm tìm parameter config từ options
export const getParameterConfig = (options, paramId) => {
  return options.find((opt) => opt.id === paramId);
};

// Hàm kiểm tra điều kiện trong descriptions
export const checkConditions = (descConditions, conditionValues) => {
  if (!descConditions || descConditions.length === 0) return true;

  return descConditions.every((cond) => {
    const paramValue = conditionValues[cond.parameter_id];
    switch (cond.operator) {
      case '==':
        return paramValue === cond.value;
      case '!=':
        return paramValue !== cond.value;
      case '>':
        return paramValue > cond.value;
      case '>=':
        return paramValue >= cond.value;
      case '<':
        return paramValue < cond.value;
      case '<=':
        return paramValue <= cond.value;
      default:
        return false;
    }
  });
};

// Hàm lấy description phù hợp
const getApplicableDescription = (
  conditionValues,
  descriptions,
  description
) => {
  // Tìm description có điều kiện thỏa mãn
  for (const desc of descriptions) {
    if (checkConditions(desc.conditions, conditionValues)) {
      return desc;
    }
  }

  return description ? { text: description, conditions: [] } : descriptions[0];
};

// Hàm parse description text để lấy danh sách tham số cần thiết
export const getParameters = (applicableDesc) => {
  // Tìm tất cả các placeholder %(...) trong text
  const paramMatches = applicableDesc.text.match(/%\(([^)]+)\)/g);

  if (!paramMatches) {
    return [];
  }

  // Extract parameter names từ matches
  const paramNames = paramMatches.map((match) => {
    const paramName = match.replace(/^%\(/, '').replace(/\)[sdf]?$/, '');
    return paramName;
  });

  // Loại bỏ duplicate
  return [...new Set(paramNames)];
};

// Hàm parse description text để lấy danh sách tham số cần thiết
export const getRequiredParameters = (condition, descriptions, description) => {
  const applicableDesc = getApplicableDescription(
    condition.values,
    descriptions,
    description
  );

  if (!applicableDesc || !applicableDesc.text) {
    return [];
  }

  return getParameters(applicableDesc);
};

export const initConditions = (parameters, description, descriptions) => {
  const des = description ? { text: description } : descriptions[0];

  const requiredParams = getParameters(des);

  return requiredParams.map((item) => {
    const param = parameters.find((i) => i.id == item);
    return {
      id: item,
      ...param,
    };
  });
};

export const findActionByType = (targetType, allActions) => {
  for (const group of allActions) {
    const match = group.actions.find(
      (action) => action.action_type === targetType
    );
    if (match) {
      return match;
    }
  }
  return null;
};

export const getActionsWithScope = (data) => {
  return data.actions.filter((action) =>
    action.parameters.some((param) => param.type === 'Scope')
  );
};

export function getScopeParams(actionData) {
  if (!actionData || !actionData.parameters) {
    return [];
  }

  return actionData.parameters.filter((param) => param.type === 'Scope');
}

export function enhanceParameters(actionParameters, actionTypeParameters) {
  if (!actionParameters || !actionTypeParameters) {
    return actionParameters || [];
  }

  return actionParameters.map((param) => {
    // Tìm thông tin từ actionType dựa trên id hoặc name
    const typeParam = actionTypeParameters.find(
      (tp) => tp.id === param.id || tp.name === param.name
    );

    return {
      ...param,
      name: typeParam?.name || param.name,
      help: typeParam?.help || param.help || '',
    };
  });
}

export const calculateTaskPriorities = (tasks) => {
  let currentPriority = 1;

  const updateTaskPriority = (task) => {
    // Cập nhật priority cho task chính
    task.priority = currentPriority++;

    // Nếu task có scope parameters và subtasks
    const scopeParams = getScopeParams(task);
    if (scopeParams && scopeParams.length > 0) {
      scopeParams.forEach((scopeParam) => {
        const subtasks = task.subtasks?.[scopeParam.id] || [];
        subtasks.forEach((subtask) => {
          // Đệ quy để cập nhật priority cho subtask
          updateTaskPriority(subtask);
        });
      });
    }

    return task;
  };

  return tasks.map(updateTaskPriority);
};

// Hàm helper để lấy tất cả tasks theo thứ tự priority (flatten)
export const getAllTasksFlattened = (tasks) => {
  const result = [];

  const flattenTask = (task) => {
    result.push(task);

    const scopeParams = getScopeParams(task);
    if (scopeParams && scopeParams.length > 0) {
      scopeParams.forEach((scopeParam) => {
        const subtasks = task.subtasks?.[scopeParam.id] || [];
        subtasks.forEach((subtask) => {
          flattenTask(subtask);
        });
      });
    }
  };

  tasks.forEach(flattenTask);
  return result;
};

// Hàm cập nhật priority khi có thay đổi trong selectedTasks
export const updateTasksWithPriorities = (tasks) => {
  return calculateTaskPriorities([...tasks]);
};

// Hàm để log tất cả tasks với priority (for debugging)
export const logTasksWithPriorities = (tasks) => {
  const flatTasks = getAllTasksFlattened(tasks);
  console.log('Tasks with priorities:');
  flatTasks.forEach((task) => {
    console.log(`Priority ${task.priority}: ${task.name} (${task.uniqueId})`);
  });
};
