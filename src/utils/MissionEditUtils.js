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
  taskId,         // ID của task hoặc subtask cần cập nhật
  scope_reference, 
  propsValue
) {

  return scope_reference
    ? actions.map((task) => {
        const param = task.parameters?.find((item) => item.guid === scope_reference);

        if (param && task.subtasks?.[param.id]) {
          return {
            ...task,
            subtasks: {
              ...task.subtasks,
              [param.id]: task.subtasks[param.id].map((subtask) => {
                if (subtask.uniqueId === taskId) {
                  return {
                    ...subtask,
                    ...propsValue
                  };
                }
                return subtask;
              }),
            },
          };
        }

        return task;
      })
    : actions.map((task) => {
        if (task.uniqueId !== taskId) return task;

        return {
          ...task,
          ...propsValue,
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

  return paramNames;
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

//dùng khi update param
export const getParamDefault = (parameters, des, compareValue) => {
  const requiredParams = getParameters(des);
  
  return requiredParams.map((item) => {
    const param = parameters.find((i) => i.id == item);

    return {
      id: item,
      ...(param.id === "compare" ? {...param, value: compareValue} : param),
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
      ...typeParam,
      ...param,
      name: typeParam?.name || param.name,
      help: typeParam?.help || param.help || '',
    };
  });
}

export const calculateTaskPriorities = (tasks) => {
  let currentPriority = 1;

  const assignPriority = (taskList) => {
    return taskList.map((task) => {
      // Gán priority cho task hiện tại
      const updatedTask = { ...task, priority: currentPriority++ };

      // Nếu task có scope parameters và subtasks
      const scopeParams = getScopeParams(task);
      if (scopeParams && scopeParams.length > 0) {
        // Đảm bảo subtasks là object
        updatedTask.subtasks = { ...(task.subtasks || {}) };

        scopeParams.forEach((scopeParam) => {
          const subtasks = task.subtasks?.[scopeParam.id] || [];
          if (Array.isArray(subtasks) && subtasks.length > 0) {
            // Gán lại các subtasks đã cập nhật priority
            updatedTask.subtasks[scopeParam.id] = assignPriority(subtasks);
          }
        });
      }

      return updatedTask;
    });
  };

  return assignPriority(tasks);
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

// Hàm để log tất cả tasks với priority (for debugging)
export const logTasksWithPriorities = (tasks) => {
  const flatTasks = getAllTasksFlattened(tasks);
  console.log('Tasks with priorities:');
  flatTasks.forEach((task) => {
    console.log(`Priority ${task.priority}: ${task.name} (${task.uniqueId})`);
  });
};

export const ConditionUtils = {
  /**
   * Tách điều kiện IF phức tạp
   */
  splitIfCondition(originalTask, conditions, logicalOperators) {
    const tasks = [];
    let currentTaskId = originalTask.uniqueId;

    // Tạo nested if conditions dựa trên toán tử logic
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      const isLastCondition = i === conditions.length - 1;
      const operator = logicalOperators[i - 1]; // Toán tử trước condition này

      const newTask = {
        ...originalTask,
        uniqueId:
          i === 0
            ? originalTask.uniqueId
            : `${originalTask.uniqueId}_split_${i}`,
        priority: originalTask.priority, // Tăng priority nhẹ để giữ thứ tự
        parameters: this.createSingleConditionParameters(
          originalTask.parameters,
          condition
        ),
        conditionsData: {
          conditions: [condition],
          logicalOperators: [],
        },
        subtasks: i === 0 ? originalTask.subtasks : {}, // Chỉ task đầu tiên giữ subtasks
        originalTaskId: originalTask.uniqueId, // Để tracking
        splitIndex: i,
      };

      // Xử lý logic dựa trên toán tử
      if (i === 0) {
        // Task đầu tiên
        if (logicalOperators[0] === '&&') {
          // AND: nếu true thì tiếp tục check condition tiếp theo
          newTask.onTrueAction = 'continue';
          newTask.onFalseAction = 'exit'; // False thì thoát luôn
        } else if (logicalOperators[0] === '||') {
          // OR: nếu true thì thực hiện luôn, false thì check condition tiếp theo
          newTask.onTrueAction = 'execute';
          newTask.onFalseAction = 'continue';
        }
      } else if (isLastCondition) {
        // Task cuối cùng
        newTask.onTrueAction = 'execute';
        newTask.onFalseAction = 'exit';
      } else {
        // Task ở giữa
        if (logicalOperators[i] === '&&') {
          newTask.onTrueAction = 'continue';
          newTask.onFalseAction = 'exit';
        } else if (logicalOperators[i] === '||') {
          newTask.onTrueAction = 'execute';
          newTask.onFalseAction = 'continue';
        }
      }

      tasks.push(newTask);
    }

    return tasks;
  },

  splitComplexCondition(task, allTasks = []) {
    const { conditionsData } = task;

    if (!conditionsData) {
      return [task]; // Không có điều kiện phức tạp, trả về task gốc
    }

    const { conditions, logicalOperators } = conditionsData;

    let splitTasks = [];
    if (task.action_type === 'if') {
      splitTasks = this.splitIfCondition(task, conditions, logicalOperators);
    } else if (task.action_type === 'while') {
      splitTasks = this.splitWhileCondition(task, conditions, logicalOperators);
    } else {
      return [task];
    }

    // Cập nhật priority cho các tasks đã tách và toàn bộ danh sách
    // return this.updatePrioritiesAfterSplit(task, splitTasks, allTasks);
    return splitTasks;
  },

  /**
   * Cập nhật priority sau khi tách task
   * @param {Object} originalTask - Task gốc
   * @param {Array} splitTasks - Các tasks đã tách
   * @param {Array} allTasks - Danh sách tất cả tasks
   * @returns {Array} - Danh sách tasks với priority đã cập nhật
   */
  updatePrioritiesAfterSplit(originalTask, splitTasks, allTasks) {
    const originalPriority = originalTask.priority;
    const splitCount = splitTasks.length;

    // Tạo bản đồ priority mới
    const priorityMap = new Map();

    // 1. Gán priority cho các split tasks
    splitTasks.forEach((task, index) => {
      priorityMap.set(task.uniqueId, originalPriority + index);
    });

    // 2. Dịch chuyển priority của các tasks sau originalTask
    allTasks.forEach((task) => {
      if (task.uniqueId === originalTask.uniqueId) {
        // Skip task gốc vì sẽ bị thay thế
        return;
      }

      if (task.priority > originalPriority) {
        // Dịch chuyển các tasks có priority lớn hơn task gốc
        const newPriority = task.priority + (splitCount - 1);
        priorityMap.set(task.uniqueId, newPriority);
      } else {
        // Giữ nguyên priority cho các tasks trước task gốc
        priorityMap.set(task.uniqueId, task.priority);
      }
    });

    // 3. Áp dụng priority mới cho split tasks
    const updatedSplitTasks = splitTasks.map((task) => ({
      ...task,
      priority: priorityMap.get(task.uniqueId),
    }));

    // 4. Trả về kết quả để cập nhật toàn bộ danh sách tasks
    return updatedSplitTasks;
  },

  /**
   * Áp dụng priority map cho toàn bộ danh sách tasks
   * @param {Array} allTasks - Danh sách tất cả tasks
   * @param {Map} priorityMap - Bản đồ priority mới
   * @param {String} originalTaskId - ID của task gốc bị thay thế
   * @returns {Array} - Danh sách tasks đã cập nhật priority
   */
  applyPriorityUpdates(allTasks, priorityMap, originalTaskId) {
    return allTasks
      .filter((task) => task.uniqueId !== originalTaskId) // Loại bỏ task gốc
      .map((task) => ({
        ...task,
        priority: priorityMap.get(task.uniqueId) || task.priority,
      }));
  },

  /**
   * Tách điều kiện IF phức tạp thành một task với nested if conditions
   */
  splitIfCondition(originalTask, conditions, logicalOperators) {
    // Tạo task chính với condition đầu tiên
    const mainTask = {
      ...originalTask,
      parameters: this.createSingleConditionParameters(
        originalTask.parameters,
        conditions[0]
      ),
      conditionsData: {
        conditions: [conditions[0]],
        logicalOperators: [],
      },
      originalTaskId: originalTask.uniqueId,
      splitIndex: 0,
    };

    // Hàm đệ quy để tạo nested subtasks
    const createNestedSubtasks = (conditionIndex) => {
      const isLastCondition = conditionIndex === conditions.length - 1;

      if (isLastCondition) {
        // Condition cuối cùng: trả về subtasks gốc
        return { ...originalTask.subtasks };
      }

      const currentOperator = logicalOperators[conditionIndex];
      const nextCondition = conditions[conditionIndex + 1];

      // Tạo nested task cho condition tiếp theo
      const nestedTask = {
        ...originalTask,
        uniqueId: `${originalTask.uniqueId}_nested_${conditionIndex + 1}`,
        priority: originalTask.priority + conditionIndex + 1,
        parameters: this.createSingleConditionParameters(
          originalTask.parameters,
          nextCondition
        ),
        conditionsData: {
          conditions: [nextCondition],
          logicalOperators: [],
        },
        originalTaskId: originalTask.uniqueId,
        splitIndex: conditionIndex + 1,
        subtasks: createNestedSubtasks(conditionIndex + 1), // Đệ quy cho condition tiếp theo
      };

      if (currentOperator === '&&') {
        // AND: true → next condition, false → false branch của original
        return {
          true: [nestedTask],
          false: originalTask.subtasks?.false || [],
        };
      } else if (currentOperator === '||') {
        // OR: true → true branch của original, false → next condition
        return {
          true: originalTask.subtasks?.true || [],
          false: [nestedTask],
        };
      } else {
        // Default: AND logic
        return {
          true: [nestedTask],
          false: originalTask.subtasks?.false || [],
        };
      }
    };

    // Gán subtasks được tạo bằng đệ quy
    mainTask.subtasks = createNestedSubtasks(0);

    return [mainTask];
  },

  /**
   * Tách điều kiện WHILE phức tạp
   */
  splitWhileCondition(originalTask, conditions, logicalOperators) {
    const tasks = [];

    // Tạo một wrapper while chung
    const wrapperTask = {
      ...originalTask,
      uniqueId: `${originalTask.uniqueId}_wrapper`,
      priority: originalTask.priority, // Sẽ được cập nhật sau
      parameters: [],
      subtasks: {},
      isWrapper: true,
    };

    tasks.push(wrapperTask);

    // Tạo các condition checks bên trong wrapper
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      const isLastCondition = i === conditions.length - 1;

      const conditionTask = {
        ...originalTask,
        action_type: 'if',
        uniqueId: `${originalTask.uniqueId}_check_${i}`,
        priority: originalTask.priority, // Sẽ được cập nhật sau
        parameters: this.createSingleConditionParameters(
          originalTask.parameters,
          condition
        ),
        conditionsData: {
          conditions: [condition],
          logicalOperators: [],
          hasComplexCondition: false,
        },
        subtasks: isLastCondition ? originalTask.subtasks : {},
        scope_reference: wrapperTask.uniqueId,
        originalTaskId: originalTask.uniqueId,
        splitIndex: i,
        isLastSplit: isLastCondition,
      };

      tasks.push(conditionTask);
    }

    return tasks;
  },

  /**
   * Thiết lập logic cho điều kiện
   */
  setupConditionLogic(task, index, isLastCondition, logicalOperators) {
    if (index === 0) {
      // Task đầu tiên
      if (logicalOperators[0] === '&&') {
        task.onTrueAction = 'continue';
        task.onFalseAction = 'exit';
      } else if (logicalOperators[0] === '||') {
        task.onTrueAction = 'execute';
        task.onFalseAction = 'continue';
      }
    } else if (isLastCondition) {
      // Task cuối cùng
      task.onTrueAction = 'execute';
      task.onFalseAction = 'exit';
    } else {
      // Task ở giữa
      if (logicalOperators[index] === '&&') {
        task.onTrueAction = 'continue';
        task.onFalseAction = 'exit';
      } else if (logicalOperators[index] === '||') {
        task.onTrueAction = 'execute';
        task.onFalseAction = 'continue';
      }
    }
  },

  /**
   * Tạo parameters cho single condition
   */
  createSingleConditionParameters(originalParameters, condition) {
    // Giữ nguyên tất cả parameters, chỉ cập nhật conditionsData
    // vì các parameters khác (compare, module, operator, value, etc.) vẫn cần thiết
    return originalParameters.map((param) => {
      // Giữ nguyên tất cả parameters
      return { ...param };
    });
  },

  /**
   * Xử lý toàn bộ danh sách tasks có điều kiện phức tạp
   */
  processComplexConditions(tasks) {
    const processedTasks = [];

    tasks.forEach((task) => {
      const splitTasks = this.splitComplexCondition(task, tasks);
      processedTasks.push(...splitTasks);
    });

    return processedTasks;
  },

  /**
   * Tính toán lại priority sau khi tách
   */
  recalculatePriorities(tasks) {
    return tasks.map((task, index) => ({
      ...task,
      priority: index + 1,
    }));
  },
};

export function getAllActionDefinitions(actions) {
  return actions.flatMap(group => group.actions || []);
}

export function getParamGuid(selectedTasks, taskId, paramId) {
  const task = selectedTasks.find(t => t.uniqueId === taskId);
  if (!task) {
    console.log(`Không tìm thấy task với id: ${taskId}`);
    return null;
  }

  const param = task.parameters?.find(p => p.id === paramId);
  if (!param) {
    console.log(`Không tìm thấy parameter với id: ${paramId} trong task ${taskId}`);
    return null;
  }

  return param.guid || null;
}

export function updateSubTaskCountInTasks(selectedTasks, taskId, paramId) {
  let updated = false;

  const newTasks = selectedTasks.map(task => {
    if (task.uniqueId !== taskId) return task;

    let paramUpdated = false;
    const updatedParameters = task.parameters?.map(param => {
      if (param.id !== paramId) return param;

      paramUpdated = true;
      updated = true;
      return {
        ...param,
        subTaskCount: (param.subTaskCount || 0) + 1,
      };
    }) || [];

    if (!paramUpdated) return task;

    return {
      ...task,
      parameters: updatedParameters,
    };
  });

  return updated ? newTasks : null;
}

/**
 * Tìm kiếm action theo tên của action hoặc tên của group
 * @param {Array} allActions - Mảng các group chứa actions
 * @param {string} searchTerm - Từ khóa tìm kiếm (tên action hoặc tên group)
 * @param {string} searchType - Loại tìm kiếm: 'action', 'group', hoặc 'both' (mặc định)
 * @param {boolean} exactMatch - Tìm kiếm chính xác hay tìm kiếm gần đúng (mặc định: false)
 * @returns {Object} Kết quả tìm kiếm
 */
function searchActions(allActions, searchTerm, searchType = 'both', exactMatch = false) {
    if (!searchTerm || typeof searchTerm !== 'string') {
        return {
            success: false,
            message: 'Từ khóa tìm kiếm không hợp lệ',
            results: []
        };
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    const results = [];

    allActions.forEach(group => {
        const groupName = group.name.toLowerCase();
        let matched = false;

        // Tìm theo tên group
        if ((searchType === 'group' || searchType === 'both')) {
            const groupMatch = exactMatch 
                ? groupName === normalizedSearchTerm
                : groupName.includes(normalizedSearchTerm);

            if (groupMatch) {
                matched = true;
            }
        }

        // Tìm theo action
        if (!matched && (searchType === 'action' || searchType === 'both') && group.actions) {
            const hasMatchingAction = group.actions.some(action => {
                const actionName = action.name.toLowerCase();
                return exactMatch 
                    ? actionName === normalizedSearchTerm
                    : actionName.includes(normalizedSearchTerm);
            });

            if (hasMatchingAction) {
                matched = true;
            }
        }

        if (matched) {
            results.push(group);
        }
    });

    return {
        success: true,
        searchTerm: searchTerm,
        searchType: searchType,
        exactMatch: exactMatch,
        length: results.length,
        results: results
    };
}

/**
 * Tìm kiếm nâng cao với nhiều tùy chọn
 * @param {Array} allActions - Mảng các group chứa actions
 * @param {Object} options - Tùy chọn tìm kiếm, {searchTerm: 'move', searchType: 'both', exactMatch: false, limit: 2}
 * @returns {Object} Kết quả tìm kiếm
 */
export function advancedSearchActions(allActions, options = {}) {
    const {
        searchTerm = '',
        searchType = 'both', // 'action', 'group', 'both'
        exactMatch = false,
        limit = null // giới hạn số kết quả
    } = options;

    let results = searchActions(allActions, searchTerm, searchType, exactMatch).results;

    // Giới hạn số kết quả nếu có
    if (limit && limit > 0) {
        results = results.slice(0, limit);
    }

    return {
        success: true,
        searchOptions: options,
        totalResults: results.length,
        results: results
    };
}

export function processDescriptions(action) {
    if (!action.parameters || !Array.isArray(action.parameters)) {
        return null;
    }

    const operatorParam = action.parameters.find(param => param.id === "operator");
    if (!operatorParam) {
        return null;
    }

    const descriptionsToProcess = [];

    if (action.description && action.description.includes('%(operator)s')) {
        descriptionsToProcess.push({
            text: action.description,
            conditions: [],
            isMainDescription: true
        });
    }

    if (action.descriptions && Array.isArray(action.descriptions)) {
        action.descriptions.forEach(desc => {
            if (desc.text && desc.text.includes('%(operator)s')) {
                descriptionsToProcess.push({
                    text: desc.text,
                    conditions: desc.conditions ? [...desc.conditions] : [],
                    isMainDescription: false
                });
            }
        });
    }

    let updatedDescription = null;
    const updatedDescriptions = [];

    descriptionsToProcess.forEach(desc => {
        const params = getParameters(desc);
        
        // Nếu đã có đủ 3 params: compare, operator, value thì bỏ qua
        if (
            params.length === 3 &&
            params.includes("compare") &&
            params.includes("operator") &&
            params.includes("value")
        ) {
            if (!desc.isMainDescription) {
                updatedDescriptions.push({
                    text: desc.text,
                    conditions: desc.conditions
                });
            }
            return;
        }

        const operatorIndex = desc.text.indexOf('%(operator)s');
        if (operatorIndex !== -1) {
            // Tìm phần trước %(operator)s
            const beforeOperator = desc.text.substring(0, operatorIndex).trim();
            
            // Tìm vị trí của %(compare)s trong phần trước
            const compareIndex = beforeOperator.indexOf('%(compare)s');
            
            if (compareIndex !== -1) {
                // Lấy phần prefix (trước %(compare)s)
                const prefix = beforeOperator.substring(0, compareIndex).trim();
                
                // Lấy phần giữa %(compare)s và %(operator)s
                const afterCompare = beforeOperator.substring(compareIndex + '%(compare)s'.length).trim();
                
                // Tạo text mới: chỉ đối xứng phần giữa %(compare)s và %(operator)s
                const newText = `${prefix} %(compare)s ${afterCompare} %(operator)s %(compare)s ${afterCompare}`.trim();
                
                if (desc.isMainDescription) {
                    updatedDescription = newText;
                } else {
                    // Chỉ thêm nếu text mới chưa tồn tại
                    const exists = action.descriptions && action.descriptions.some(d => d.text === newText);
                    if (!exists) {
                        updatedDescriptions.push({
                            text: newText,
                            conditions: desc.conditions
                        });
                    }
                }
            } else {
                // Nếu không có %(compare)s, thêm %(compare)s và xử lý như trước
                const words = beforeOperator.split(' ');
                let prefix = '';
                let comparePattern = '';
                
                if (words.length > 0) {
                    prefix = words[0];
                    if (words.length > 1) {
                        comparePattern = words.slice(1).join(' ');
                    }
                }
                
                const newText = `${prefix} %(compare)s ${comparePattern} %(operator)s %(compare)s ${comparePattern}`.trim();
                
                if (desc.isMainDescription) {
                    updatedDescription = newText;
                } else {
                    const exists = action.descriptions && action.descriptions.some(d => d.text === newText);
                    if (!exists) {
                        updatedDescriptions.push({
                            text: newText,
                            conditions: desc.conditions
                        });
                    }
                }
            }
        }
    });

    if (!updatedDescription && updatedDescriptions.length === 0) {
        return null;
    }

    return {
        description: updatedDescription,
        descriptions: updatedDescriptions.length > 0 ? updatedDescriptions : null
    };
}

/**
 * Cập nhật choices cho parameter có id là "register"
 * @param {Array} parameters - Mảng các parameter objects
 * @param {Array} registerChoices - Mảng choices mới cho register
 * @returns {Array} Mảng parameters đã được cập nhật
 */
export function updateRegisterChoices(parameters, registerChoices) {
  let isUpdate = false;

  const newParameters = parameters.map(param => {
    // Kiểm tra nếu param có id là "register"
    if (param.id === "register") {

      isUpdate = true;
      
      return {
        ...param,
        constraints: {
          ...param.constraints,
          choices: registerChoices,
        }
      };
    }
    
    // Trả về param gốc nếu không phải register
    return param;
  });

  return isUpdate ? newParameters : null;
}